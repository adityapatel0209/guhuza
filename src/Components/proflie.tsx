import React, { useEffect, useState } from "react";
import { userData } from "../delete_testfolder/delete_this_userinfo";
import insta from "../asset/other/instagram.svg";
import x from "../asset/other/x.svg";
import ln from "../asset/other/linkedin.svg";
import Badges from "./Badges";

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
                <div className="profile-badge">
                  <Badges rank={Number(selectedUserId)} />
                </div>
                <div className="profileinfo-main">
                  <div className="userInfo">
                    <div className="profileinfogroup-1 props">
                      <div className="pfp">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/en/0/03/Josep_Maria_Garc%C3%ADa.jpg"
                          alt="userImage"
                        />
                      </div>
                      <div>
                        <h3>{u.username}</h3>
                        <p>Date Joined : </p>
                        <p>
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

                    <div className="user-links">
                      <div className="insta">
                        <a href="/">
                          <img src={insta} alt="" />
                        </a>
                      </div>
                      <div className="x">
                        <a href="/">
                          <img src={x} alt="" />
                        </a>
                      </div>
                      <div className="ln">
                        <a href="/">
                          <img src={ln} alt="" />
                          </a>
                      </div>
                    </div>

                    <div className="u-stats">
                      <div>
                        <p>Highest Score</p>
                        <span> {u.stats.highestscore}</span>
                      </div>
                      <div>
                        <p>Number of Attempts</p>
                        <span> {u.stats.numberofattempts}</span>
                      </div>
                      <div>
                        <p>Overall Stars</p>
                        <span> {u.stats.overallstars}</span>
                      </div>
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
