import React, { useState } from "react";
import Compareboard from "../Components/compareboard";
import Profile from "../Components/proflie";

export default function Leaderboard() {
  const [selectedUserId, setSelectedUserId] = useState("");

  const handleUserselect = (item: string) => {
    setSelectedUserId(item);
  };

  return (
    <>
      <div className="lb">
        <div className="lb-main">
         
          <div className="profile-com">
            <Profile selectedUser={selectedUserId} />
          </div>
          <div className="compareboard">
            <Compareboard Clicked={handleUserselect} />
          </div>
        </div>
      </div>
    </>
  );
}
