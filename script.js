// Replace with your real backend URL
const API_URL = "https://python-test-deploy1.onrender.com";

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