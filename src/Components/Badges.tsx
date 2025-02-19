import React from "react";

import em1 from "../asset/other/first-em.svg";
import em2 from "../asset/other/second-em.svg";
import em3 from "../asset/other/third-em.svg";

interface Badgesprops{
    rank:number
}

export default function Badges ({rank}:Badgesprops) {
    return (
      <>
        {rank === 1 ? (
          <img src={em1} alt="badge1" />
        ) : rank === 2 ? (
          <img src={em2} alt="badge2" />
        ) : rank === 3 ? (
          <img src={em3} alt="badge3" />
        ) : (
          ""
        )}
      </>
    );
  };
  
  