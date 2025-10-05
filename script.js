// Replace with your real backend URL
const API_URL = "https://python-test-2-vwex.onrender.com";

async function checkAPI() {
  try {
    const res = await fetch(`${API_URL}/`);
    const data = await res.json();
    console.log("Root response:", data);

    const deployRes = await fetch(`${API_URL}/deploy`);
    const deployData = await deployRes.json();
    console.log("Deploy response:", deployData);

    document.getElementById("output").textContent = 
      `Root: ${JSON.stringify(data)}\nDeploy: ${JSON.stringify(deployData)}`;
  } catch (err) {
    console.error("Error reaching API:", err);
  }
}

checkAPI();
let data = "";
let zerosOnesChart = null;
document.getElementById("uploadBtn").addEventListener("click", async () => {
  const fileInput = document.getElementById("csvFile");
  if (!fileInput.files.length) {
    console.log("No file selected");
    return;
  }

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch(`${API_URL}/upload-csv/`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error(`Server error: ${res.status}`);

    data = await res.json();
    //console.log(data.predictions[0][0]);

    // Render the returned JSON into the page
    //if (out) out.textContent = JSON.stringify(data, null, 2);

    // Save the returned JSON as a file on the user's machine (triggers browser download)
    try {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "raw_predictions.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      console.log("Saved response to data_from_script.json");
    } catch (saveErr) {
      console.error("Error saving JSON to file:", saveErr);
    }
  } catch (err) {
    console.error("Error uploading file:", err);
  }
  const out = document.getElementById("jsonOutput");
  let textin = "";
  let amountofones = 0;
  let amountofzeros = 0;
  for(let i=0; i<data.predictions.length; i++){
    textin += data.predictions[i][0] + ": " +data.predictions[i][1]+"<br>";
    if(data.predictions[i][1] == 1) amountofones++;
    if(data.predictions[i][1] == 0) amountofzeros++;
  }
  if (out) out.innerHTML = textin;

  // Render Zeros vs Ones bar chart
  try {
    const ctx = document.getElementById('myChart').getContext('2d');
    const labels = ['Zeros', 'Ones'];
    const counts = [amountofzeros, amountofones];
    if (zerosOnesChart) {
      zerosOnesChart.data.datasets[0].data = counts;
      zerosOnesChart.update();
    } else {
      zerosOnesChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Count',
            data: counts,
            backgroundColor: ['rgba(201, 203, 207, 0.8)', 'rgba(54, 162, 235, 0.8)'],
            borderColor: ['rgba(201, 203, 207, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
        }
      });
    }
  } catch (e) {
    console.error('Error drawing zeros/ones chart:', e);
  }

});
