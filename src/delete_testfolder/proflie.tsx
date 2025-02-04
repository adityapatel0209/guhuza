import React, { useEffect, useState } from "react";
import { userData } from "./delete_this_userinfo";

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
                <div className="profileinfogroup-1">
                  <img
                    src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRVtbGO_5O3wYHzdsHNdDs9x6ecdCkZckrGHVGof6WCVZ4K7m10J3uCH6GRZP56RRy0z9y0fpzrFXj0mLQmeqps9w"
                    alt="userImage"
                  />
                  <div>
                    <h2>{u.username}</h2>
                    <h3>Other info</h3>
                    </div>
                </div>

                <div className="profileinfogroup-2">
                  <p>Highest Score: {u.stats.highestscore}</p>
                  <p>Number of Attempts: {u.stats.numberofattempts}</p>
                  <p>Overall Stars: {u.stats.overallstars}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
