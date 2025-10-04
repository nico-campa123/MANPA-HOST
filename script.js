document.getElementById("loadData").addEventListener("click", () => {
  // 🔹 Mock dataset (like API would return)
  const data = {
    summary: {
      mean: { Sales: 120, Profit: 45, Expenses: 80, Customers: 200 },
      std: { Sales: 15, Profit: 8, Expenses: 12, Customers: 30 }
    },
    preview: [
      { Sales: 100, Profit: 40, Expenses: 70, Customers: 180 },
      { Sales: 130, Profit: 50, Expenses: 90, Customers: 220 },
      { Sales: 110, Profit: 42, Expenses: 85, Customers: 190 },
      { Sales: 140, Profit: 48, Expenses: 75, Customers: 210 }
    ]
  };

  const means = data.summary.mean;
  const stds = data.summary.std;
  const columns = Object.keys(means);

  // --- BAR CHART ---
  new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
      labels: columns,
      datasets: [{
        label: "Average",
        data: Object.values(means),
        backgroundColor: "rgba(54, 162, 235, 0.6)"
      }]
    },
    options: { responsive: true }
  });

  // --- LINE CHART ---
  const firstColumn = data.preview.map(row => row[columns[0]]);
  new Chart(document.getElementById("lineChart"), {
    type: "line",
    data: {
      labels: firstColumn.map((_, i) => `Row ${i+1}`),
      datasets: [{
        label: columns[0],
        data: firstColumn,
        borderColor: "rgba(255, 99, 132, 0.8)",
        fill: false
      }]
    },
    options: { responsive: true }
  });

  // --- PIE CHART ---
  new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: {
      labels: columns,
      datasets: [{
        label: "Proportion",
        data: Object.values(means),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)"
        ]
      }]
    },
    options: { responsive: true }
  });

  // --- RADAR CHART ---
  new Chart(document.getElementById("radarChart"), {
    type: "radar",
    data: {
      labels: columns,
      datasets: [{
        label: "Std Dev",
        data: Object.values(stds),
        backgroundColor: "rgba(153, 102, 255, 0.3)",
        borderColor: "rgba(153, 102, 255, 1)"
      }]
    },
    options: { responsive: true }
  });
});
