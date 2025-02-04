import React from "react";
import { userData } from "./delete_this_userinfo";

interface compareProps {
  Clicked: (item: string) => void;
}

export default function Compareboard({ Clicked }: compareProps) {
  return (
    <>
      <div className="lbchild compare">
        <table>
          <caption><h1>Leaderboard</h1></caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Highest Score</th>
              <th>Rank</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((u, index) => (
              <tr className="bodytr" key={index} onClick={() => Clicked(u.userId)}>
                <td>{index+1}</td> <td>{u.username}</td> <td>{u.stats.highestscore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
