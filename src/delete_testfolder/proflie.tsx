import React, { useEffect, useState } from "react";
import { userData } from "./delete_this_userinfo";
import { PieChart, Pie, Cell, Tooltip, Legend,LineChart,Line,XAxis,YAxis,CartesianGrid } from "recharts";

interface profileProps {
  selectedUser: string;
}

export default function Profile({ selectedUser }: profileProps) {
  const [selectedUserId, setSelectedUserId] = useState("1");

  useEffect(() => {
    if (selectedUser) {
      setSelectedUserId(selectedUser);
    }
  }, [selectedUser]);

  return (
    <>
      <div className="lbchild profile">
        <h1>Profile</h1>
        {userData.map((u, index) => (
          <div key={index}>
            {u.userId === selectedUserId && (
              <div className="profileinfo">
                <div className="profileinfo-main">
                  <div className="profileinfogroup-1">
                    <img
                      src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRVtbGO_5O3wYHzdsHNdDs9x6ecdCkZckrGHVGof6WCVZ4K7m10J3uCH6GRZP56RRy0z9y0fpzrFXj0mLQmeqps9w"
                      alt="userImage"
                    />
                    <div>
                      <h2>{u.username}</h2>
                      <h5>Date Joined : {u.datejoined.toDateString()}</h5>
                    </div>
                  </div>

                  <div className="profileinfogroup-2">
                    <div>
                      <p>Highest Score: {u.stats.highestscore}</p>
                      <p>Number of Attempts: {u.stats.numberofattempts}</p>
                      <p>Overall Stars: {u.stats.overallstars}</p>
                    </div>
                    <CustomPieChart Attempts={u.stats.numberofattempts} Stars={u.stats.overallstars}/>
                  </div>
                </div>
                <div className="profileinfo-sub">
                  <h4>Bio</h4>
                  <p>{u.userbio}</p>
                  <ul className="tags">
                    {u.tags.map((t, index) => (
                      <li key={index}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
interface CustomPieChartProps {
  Attempts: number;
  Stars: number;
}

const CustomPieChart: React.FC<CustomPieChartProps> = ({ Attempts, Stars }) => {
  const COLORS = ["#0088FE", "#FFBB28"];

  return (
    <PieChart width={200} height={250}>
      <Pie
        data={[
          { name: "Attempts", value: Attempts },
          { name: "Stars", value: Stars },
        ]}
        cx="50%"
        cy="50%"
        innerRadius={55}
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

interface CustomLineChartProps{
  interval1: number;
  interval2: number;
  interval3: number;
  interval4: number;
  interval5: number;
}

const CustomLineChart=({ interval1, interval2, interval3, interval4, interval5 }: CustomLineChartProps)=>{
  return (
    <LineChart width={500}>

    </LineChart>
  );
}