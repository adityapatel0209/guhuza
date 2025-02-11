import React from "react"
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";
import { userData } from "../delete_testfolder/delete_this_userinfo";
  
export default function Analytics() {

    const user = 3; // Default user assume
    const u = userData[user];
    return (
        <>
        
          <div className="piechart props info">
                      <p className="info-title">Stats</p>
                      <CustomPieChart
                        Attempts={u.stats.numberofattempts}
                        Stars={u.stats.overallstars}
                      />
            </div>
            
            <div className="linechart props">
                  <p className="info-title">Level Score</p>
                  <CustomLineChart
                    interval1={u.stats.levelIntervalscore.interval1}
                    interval2={u.stats.levelIntervalscore.interval2}
                    interval3={u.stats.levelIntervalscore.interval3}
                    interval4={u.stats.levelIntervalscore.interval4}
                    interval5={u.stats.levelIntervalscore.interval5}
                  />
                </div>
        </>
    )
}


interface CustomPieChartProps {
    Attempts: number;
    Stars: number;
  }
  
  const CustomPieChart: React.FC<CustomPieChartProps> = ({ Attempts, Stars }) => {
    const COLORS = ["#73bfb8", "#3da5d9"];
  
    return (
      <PieChart width={200} height={200}>
        <Pie
          data={[
            { name: "Attempts", value: Attempts },
            { name: "Stars", value: Stars },
          ]}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {[Attempts, Stars].map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    );
  };
  
  interface CustomLineChartProps {
    interval1: number;
    interval2: number;
    interval3: number;
    interval4: number;
    interval5: number;
  }
  
  const CustomLineChart = ({
    interval1,
    interval2,
    interval3,
    interval4,
    interval5,
  }: CustomLineChartProps) => {
    return (
      <LineChart
        width={900}
        height={400}
        data={[
          { name: "Level 1-10", Score: interval1 },
          { name: "Level 11-20", Score: interval2 },
          { name: "Level 21-30", Score: interval3 },
          { name: "Level 31-40", Score: interval4 },
          { name: "Level 41-50", Score: interval5 },
        ]}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Score"
          stroke="#e5a9a9"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    );
  };
  