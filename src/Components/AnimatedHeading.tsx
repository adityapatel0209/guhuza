import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "../Styles/AnimatedHeading.css";

interface AnimatedHeadingProps {
  children: React.ReactNode;
}

export default function AnimatedHeading({ children }: AnimatedHeadingProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lengthProgress = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["0%", "50%", "100%"]
  );

  return (
    <>
      <span className="heading-container">
        <span className="child-span">{children}</span>

        <div className="animatedLine" ref={ref}>
          <motion.div
            className="animatedLine1"
            style={{ width: lengthProgress }}
          />

          <motion.div
            className="animatedLine2"
            style={{ width: lengthProgress }}
          />
        </div>
      </span>
    </>
  );
}
