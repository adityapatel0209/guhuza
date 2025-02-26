import React, { useLayoutEffect, useRef, useState } from "react";
import {
  FiAward,
  FiBarChart,
  FiUsers,
  FiClock,
  FiBook,
  FiCheckCircle,
  FiTrendingUp,
  FiTarget,
  FiArrowRight,
} from "react-icons/fi";

import AnimatedHeading from "../Components/AnimatedHeading";

import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";

import "../Styles/Features.css";

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    setTimeout(() => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
        console.log("Height after delay:", rect.height);
      }
    }, 0); // Delay by 0 milliseconds to run after initial rendering
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 30%", "end 100%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section className="features animate-on-scroll" ref={containerRef}>

        <h1 className="section-title">Features of <AnimatedHeading>Guhuza</AnimatedHeading> Quizzes</h1>
     
      <div className="features-grid-container" ref={ref}>
        <div className="features-grid">
          <div className="features-grid-right">
            <div className="stickygap">
              <div className="feature-card-parent card-right">
                <div className="feature-card">
                  <FiBarChart className="feature-icon" />
                  <h3>Scorecard & Insights</h3>
                  <p>Real-time performance tracking and personalized tips.</p>
                </div>
                <div className="theball">
                  <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="stickygap">
              <div className="feature-card-parent card-right">
                <div className="feature-card">
                  <FiAward className="feature-icon" />
                  <h3>Levels & Achievements</h3>
                  <p>Unlock levels and earn badges for your skills.</p>
                </div>
                <div className="theball">
                  <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="stickygap">
              <div className="feature-card-parent card-right">
                <div className="feature-card">
                  <FiUsers className="feature-icon" />
                  <h3>Community Support</h3>
                  <p>Join a community of learners and share your progress.</p>
                </div>{" "}
                <div className="theball">
                  <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="features-grid-left">
            <div className="empty-card" />
            <div>
              <div className="stickygap">
                <div className="feature-card-parent card-left">
                  <div className="feature-card">
                    <FiCheckCircle className="feature-icon" />
                    <h3>Sidebar Navigation</h3>
                    <p>Easy access to questions and progress tracking.</p>
                  </div>
                  <div className="theball">
                    <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                      <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="stickygap">
                <div className="feature-card-parent card-left">
                  <div className="feature-card">
                    <FiClock className="feature-icon" />
                    <h3>Learning & Challenge Modes</h3>
                    <p>Practice at your pace or compete in timed quizzes.</p>
                  </div>
                  <div className="theball">
                    <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                      <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="stickygap">
                <div className="feature-card-parent card-left">
                  <div className="feature-card">
                    <FiBook className="feature-icon" />
                    <h3>Extensive Resources</h3>
                    <p>Access a library of resources to help you prepare.</p>
                  </div>{" "}
                  <div className="theball">
                    <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                      <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="line-container">
        <div
          style={{
            height: height + "px",
          }}
          className="gradient-bar"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="gradient-fill"
          />
        </div>
      </div>
    </section>
  );
}
