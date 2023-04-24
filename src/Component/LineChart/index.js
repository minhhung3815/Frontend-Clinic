import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from "react-chartjs-2";

ChartJS.register(...registerables);

function LineChart({ chartData }) {
  return <Line data={chartData} />;
}

export default LineChart;
