import React, { useEffect, useState } from "react";
import { userData } from "../delete_testfolder/delete_this_userinfo";
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
        {/* <h1>Profile</h1> */}

        {userData.map((u, index) => (
          <div key={index}>
            {u.userId === selectedUserId && (
              <div className="profileinfo">
                <div className="profileinfo-main">
                  <div className="userInfo">
                   
                    <div className="profileinfogroup-1 props">
                      <img
                        src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRVtbGO_5O3wYHzdsHNdDs9x6ecdCkZckrGHVGof6WCVZ4K7m10J3uCH6GRZP56RRy0z9y0fpzrFXj0mLQmeqps9w"
                        alt="userImage"
                      />
                      <div>
                        <h3>{u.username}</h3>
                        <p>Date Joined : {u.datejoined.toDateString().split(' ').slice(1).join(' ')}</p>
                      </div>
                    </div>

                    <div className="profileinfo-bio props">
                      <h3>Bio</h3>
                      <p>{u.userbio}</p>
                      <ul className="tags">
                        {u.tags.map((t, index) => (
                          <li key={index}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="userStats">
                    <div className="highestscore props info">
                      <p className="info-title">Highest Score</p>
                      <span className="info-data">{u.stats.highestscore}</span>
                    </div>
                    <div className="n-attempts props info">
                      <p className="info-title">Number of Attempts</p>
                      <span className="info-data">{u.stats.numberofattempts}</span>
                    </div>
                    <div className="o-star props info">
                      <p className="info-title">Overall Stars</p>
                      <span className="info-data">{u.stats.overallstars}</span>
                    </div>

                  </div>

          
                </div>
                <div className="profileinfogroup-2">
                      <CustomPieChart
                        Attempts={u.stats.numberofattempts}
                        Stars={u.stats.overallstars}
                      />
                    </div>

                    <div className="linechart">
                      <CustomLineChart
                        interval1={u.stats.levelIntervalscore.interval1}
                        interval2={u.stats.levelIntervalscore.interval2}
                        interval3={u.stats.levelIntervalscore.interval3}
                        interval4={u.stats.levelIntervalscore.interval4}
                        interval5={u.stats.levelIntervalscore.interval5}
                      />
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
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};
