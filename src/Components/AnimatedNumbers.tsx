import AnimatedNumbers from "react-animated-numbers";
import React from "react";

interface AnimatedNumProps {
    num: number;
  }
  const AnimatedNum = ({ num }: AnimatedNumProps) => {
    return (
      <>
        <AnimatedNumbers
          includeComma
          transitions={(index) => ({ type: "string", duration: index + 1 })}
          animateToNumber={num}
        />
      </>
    );
  };

  
export default AnimatedNum;