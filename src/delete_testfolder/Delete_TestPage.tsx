import React, { useState } from "react";
import { userData } from "./delete_this_userinfo";
import Compareboard from "./compareboard";
import Profile from "./proflie";

export default function Leaderboard() {
  const [selectedUserId, setSelectedUserId] = useState("");

  const handleUserselect = (item: string) => {
    setSelectedUserId(item);
  };

  return (
    <>
      <div className="lb">
        <div className="compareboard">
          <Compareboard Clicked={handleUserselect} />
        </div>
        <div className="profile-com">
          <Profile selectedUser={selectedUserId} />
        </div>
      </div>
    </>
  );
}
