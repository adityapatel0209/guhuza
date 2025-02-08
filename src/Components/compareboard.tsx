import React, { useEffect, useState } from "react";
import { userData } from "../delete_testfolder/delete_this_userinfo";

interface compareProps {
  Clicked: (item: string) => void;
}

export default function Compareboard({ Clicked }: compareProps) {

  const [clickedUser, setClickeduser] = useState("3")
  
  const handleClickedUser = (item:string) => {
    setClickeduser(item)
  }

  useEffect(() => {
    Clicked(clickedUser);
},[clickedUser])

  return (
    <>
      <div className="lbchild compare">
        <table>
          <caption><h1>Leaderboard</h1></caption>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Highest Score</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((u, index) => (
              <tr className={`bodytr ${clickedUser===u.userId && "Active"}` } key={index} onClick={() => handleClickedUser(u.userId)}>
                <td>{index+1}</td> <td>{u.username}</td> <td>{u.stats.highestscore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
