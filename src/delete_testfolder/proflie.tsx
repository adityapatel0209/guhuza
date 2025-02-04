import React from "react";
import { userData } from "./delete_this_userinfo";

interface profileProps{
    selectedUser: string;
}

export default function Profile({selectedUser}:profileProps) {
  return (
    <>
      <div className="profile">
        {userData.map((u, index) => (
           
            <div>
                {selectedUser === u.userId && (
                    <div>
                        {u.userId} {u.username} 
                        <p>{u.stats.highestscore} </p>
                        <p>{u.stats.numberofattempts}</p>
                        <p>{u.stats.overallstars}</p>
                     </div> 
               )}
           </div>
        ))}
      </div>
    </>
  );
}
