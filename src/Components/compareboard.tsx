import React, { useEffect, useState } from "react";
import { userData } from "../delete_testfolder/delete_this_userinfo";
// import {Document, Page} from "react-pdf"

import Badges from "./Badges";

interface compareProps {
  Clicked: (item: string) => void;
}

export default function Compareboard({ Clicked }: compareProps) {
  const [clickedUser, setClickeduser] = useState("3");

  const handleClickedUser = (item: string) => {
    setClickeduser(item);
  };

  const handleResumeClick = () => {};

  useEffect(() => {
    Clicked(clickedUser);
  }, [clickedUser]);

  return (
    <>
      <div className="lbchild compare">
        <table>
          <caption>
            <h1>Leaderboard</h1>
          </caption>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Highest Score</th>
              <th>Profile Shared</th>
              <th>Duration on Leaderboard</th>
              <th>Resume</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((u, index) => (
              <tr
                className={`bodytr ${clickedUser === u.userId && "Active"}`}
                key={index}
                onClick={() => handleClickedUser(u.userId)}
              >
                <td>{index + 1}</td>

                <td>
                  {" "}
                  <span className="badges-ab"><Badges rank={index + 1} /></span>
                  {" "}
                  <span>{u.username}</span>
                </td>
                <td>{u.stats.highestscore}</td>
                <td>{u.profileshared}</td>
                <td>{u.leaderboardduration} days</td>
                <td className="resume-section">{u.resume.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

