// Just a test componenet for new testing components

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "../Styles/Test.css";

export default function TestComponent() {
  return (
    <>
      <div className="h-[200vh] flex flex-col justify-between bg-gray-100">
        <div className="h-screen flex items-center justify-center">
          <h1 className="text-2xl font-bold">Scroll down to see the effect</h1>
        </div>
        <div className="h-screen flex items-center justify-center">
          <div className="h-screen flex-row " style={{ position: "relative", width:"80rem" }}>
            <h1 className="px-6 py-3" style={{fontSize:"4rem"}}>
              Animated Button what is <AnimatedButton>going</AnimatedButton> on
              i dont know
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

function AnimatedButton({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const backgroundProgress = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5],
    ["0%", "50%", "100%"]
  );
  return (
    <span style={{position:"relative"}}>
      {children}
      <div
        ref={ref}
        className="test-motion"
        style={{
          position: "absolute",
          right:"0",
          height: "1rem",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 30%,black 70%,transparent 100%)",
        }}
      >
        <motion.div
          className="animationpart"
          style={{
            height: "0.2rem",
            borderBottomLeftRadius: "9000px",
            width: backgroundProgress,
            background: "linear-gradient(to right,  #a855f7 0%, #3b82f6 20%)",
          }}
        ></motion.div>

        <motion.div
          className="animationpart1"
          style={{
            background: "linear-gradient(to left,  #a855f7 0%, #3b82f6 20%)",
            height: "0.2rem",
            borderBottomRightRadius: "9000px",
            width: backgroundProgress,
          }}
        ></motion.div>
      </div>
    </span>
  );
}

/*   const backgroundProgress = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5],
    [
      "linear-gradient(to left, blue 0%, transparent 0%)",
      "linear-gradient(to left, blue 50%, transparent 0%)",
      "linear-gradient(to left, blue 100%, transparent 0%)",
    ]
  );

  const backgroundProgressR = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5],
    [
      "linear-gradient(to right, blue 0%, transparent 0%)",
      "linear-gradient(to right, blue 50%, transparent 0%)",
      "linear-gradient(to right, blue 100%, transparent 0%)",
    ]
  );

  return (
    <div className="h-[200vh] flex flex-col justify-between bg-gray-100">
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Scroll down to see the effect</h1>
      </div>
      <div className="h-screen flex items-center justify-center">
        <div className="h-screen flex-row " style={{ position: "relative" }}>
          <h1 className="px-6 py-3">Animated Button</h1>

          <div ref={ref} style={{ display: "flex", justifyContent: "center" }}>
            <motion.div
              className="animationpart"
              style={{
                height: "0.2rem",
                width: "100%",
                background: backgroundProgress,
              }}
            ></motion.div>

            <motion.div
              className="animationpart1"
              style={{
                background: backgroundProgressR,
                height: "0.2rem",
                width: "100%",
              }}
            ></motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
 */
{
  /* // Just a test componenet for new testing components


import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function AnimatedButton() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const backgroundProgress = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "radial-gradient(circle at top center, #3b82f6 0%, #000000 0%)",
      "radial-gradient(circle at top center, #3b82f6 100%, #000000 100%)",
      "radial-gradient(circle at top center, #3b82f6 0%, #000000 0%)",
    ],
  )

  return (
    <div className="h-[200vh] flex flex-col justify-between bg-gray-100">
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Scroll down to see the effect</h1>
      </div>
      <div className="h-screen flex items-center justify-center">
        <motion.h1
          ref={ref}
          className="px-6 py-3 text-white overflow-hidden"
          style={{ background: backgroundProgress }}
        >
          Animated Button
        </motion.h1>
      </div>
    </div>
  )
}
 */
}
