import React from "react";
import { userData } from "./delete_this_userinfo";

interface compareProps{
    Clicked:(item:string)=>void
}

export default function Compareboard({ Clicked }:compareProps) {
  return (
    <>
      <div className="compare">
        {userData.map((u, index) => (
            <div key={index} onClick={()=>Clicked(u.userId)}>
                {u.username} {u.stats.highestscore}
            </div>
        ))}
      </div>
    </>
  );
}
