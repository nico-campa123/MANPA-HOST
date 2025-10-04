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

    const data = await res.json();
    console.log("Number of characters in CSV:", data.characters);
  } catch (err) {
    console.error("Error uploading file:", err);
  }
});