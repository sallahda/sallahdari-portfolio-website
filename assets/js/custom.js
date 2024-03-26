document.addEventListener('DOMContentLoaded', function() {

const barCtx = document.getElementById('barChart').getContext('2d');
const barChart = new Chart(barCtx, {
  type: 'bar',
  data: {
    labels: [
      'AWS',
      'Terraform',
      'Python',
      'Pandas',
      'SQL',
      'Java',
      'Node.js',
    ],
    datasets: [{
      label: 'Skills',
      data: [60, 60, 70, 60, 80, 70, 20], // Example data for DevOps skills
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1
    }]
  },
  options: {
    indexAxis: 'y',
    scales: {
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
          drawBorder: true,
          drawOnChartArea: true,
          drawTicks: true,
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
          drawBorder: true,
          drawOnChartArea: true,
          drawTicks: true,
        }
      }
    }
  }
  
});
