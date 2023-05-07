import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import NewContext from "Context/createContext";
import { useContext } from "react";

const data = [
  { name: "Jan", total: 1200 },
  { name: "Feb", total: 3000 },
  { name: "Mar", total: 1002 },
  { name: "Apr", total: 900 },
  { name: "May", total: 500 },
  { name: "June", total: 3200 },
  { name: "July", total: 1200 },
  { name: "Aug", total: 1200 },
  { name: "Sep", total: 100 },
  { name: "Oct", total: 120 },
  { name: "Nov", total: 3200 },
  { name: "Dec", total: 2100 },
];

const Chart = () => {
  const { totalAppointments } = useContext(NewContext);
  console.log(totalAppointments);
  return (
    <div className="chart">
      <div className="title">Total Appointments</div>
      <ResponsiveContainer width="100%" aspect={2 / 1}>
        <AreaChart
          width={"100%"}
          height={250}
          data={totalAppointments}
          margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
