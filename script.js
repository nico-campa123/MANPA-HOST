// Replace with your real backend URL
const API_URL = "https://plebeyoo.onrender.com";

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
    console.log("Number of characters in CSV:", data.characters);
  } catch (err) {
    console.error("Error uploading file:", err);
  }
});

// Data for the chart
const months = ["inp1"];
const salesFigures = [data.characters]; 

// Configuration object
const datasuli = {
    labels: months,
    datasets: [{
        label: 'Tamaño del csv',
        backgroundColor: 'rgba(75, 192, 192, 0.5)', // Teal color
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
        data: salesFigures,
    }]
};
console.log(salesFigures);
const config = {
    type: 'line', // You can change this to 'bar', 'pie', etc.
    datasuli: datasuli,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

// Create and Render the Chart using the 'myChart' canvas ID
// We use a self-invoking function or check for document readiness to ensure 
// the canvas element is loaded before the script tries to access it.
new Chart(
    document.getElementById('myChart'),
    config
);