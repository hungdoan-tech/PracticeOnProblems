// Need further effort to impl supporting for these kind of charts
// Scatter Plot
// Line Chart
// Bar Chart
// Pie Chart
// Donut Chart
// Bubble Chart
// Area Chart
// Radar Chart
// Mixed Chart
const ChartLibrary = (function () {
  const drawColumnChart = function (data, canvasId, options) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = canvas.width / data.length;
    const maxValue = Math.max(...data);
    const scaleFactor = canvas.height / maxValue;

    data.forEach((value, index) => {
      const barHeight = value * scaleFactor;
      const x = index * barWidth;
      const y = canvas.height - barHeight;
      ctx.fillStyle = "blue";
      ctx.fillRect(x, y, barWidth, barHeight);
    });

    if (options.title) {
      ctx.font = "bold 16px Arial";
      ctx.textAlign = "center";
      ctx.fillText(options.title, canvas.width / 2, 20);
    }
  };

  const drawLineChart = function (data, canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const interval = canvas.width / (data.length - 1);
    const maxValue = Math.max(...data);
    const scaleFactor = canvas.height / maxValue;

    ctx.beginPath();
    ctx.moveTo(0, canvas.height - data[0] * scaleFactor);
    data.forEach((value, index) => {
      const x = index * interval;
      const y = canvas.height - value * scaleFactor;
      ctx.lineTo(x, y);
    });
    ctx.strokeStyle = "blue";
    ctx.stroke();
  };

  return {
    drawColumnChart: drawColumnChart,
    drawLineChart: drawLineChart,
  };
})();

// Export the library in global scope (for browsers)
if (typeof window !== "undefined") {
  window.ChartLibrary = ChartLibrary;
}
