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
    console.log(data);
    // Save the returned JSON as a file on the user's machine (triggers browser download)
    try {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "data_from_script.json";
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
});
