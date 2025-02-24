// Just a test componenet for new testing components


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
        <motion.button
          ref={ref}
          className="px-6 py-3 text-white overflow-hidden"
          style={{ background: backgroundProgress }}
        >
          Animated Button
        </motion.button>
      </div>
    </div>
  )
}
