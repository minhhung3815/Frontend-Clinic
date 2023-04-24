import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from "react-chartjs-2";

ChartJS.register(...registerables);

function BarChart({ chartData }) {
  return <Bar data={chartData} />;
}

export default BarChart;
