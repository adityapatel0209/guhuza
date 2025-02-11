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

import AnimatedNumbers from "react-animated-numbers";

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
                        <p>
                          Date Joined :{" "}
                          {u.datejoined
                            .toDateString()
                            .split(" ")
                            .slice(1)
                            .join(" ")}
                        </p>
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
                      <span className="info-data">
                        <AnimatedNum num={u.stats.highestscore} />
                      </span>
                    </div>
                    <div className="n-attempts props info">
                      <p className="info-title">Number of Attempts</p>
                      <span className="info-data">
                        <AnimatedNum num={u.stats.numberofattempts} />
                      </span>
                    </div>
                    <div className="o-star props info">
                      <p className="info-title">Overall Stars</p>
                      <span className="info-data">
                        <AnimatedNum num={u.stats.overallstars} />
                      </span>
                    </div>
                    
                  
                  
                  </div>
                </div>

               

              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

interface AnimatedNumProps {
  num: number;
}
const AnimatedNum = ({ num }: AnimatedNumProps) => {
  return (
    <>
      <AnimatedNumbers
        includeComma
        transitions={(index) => ({ type: "string", duration: index + 1 })}
        animateToNumber={num}
      />
    </>
  );
};
