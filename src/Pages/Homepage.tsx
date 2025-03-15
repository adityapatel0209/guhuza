import { useEffect, useRef, useState } from "react";
import React from "react";
import Slider from "react-slick";

import { FiArrowRight, FiBook } from "react-icons/fi";

import "../Styles/HomePage.css";
import Features from "../Components/Features";
import AnimatedButton from "../Components/AnimatedButton";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import stock1 from "../asset/other/stock2.webp";
import stock2 from "../asset/other/stock1.webp";
import stock3 from "../asset/other/stock4.jpg";
import stock4 from "../asset/other/stock5.jpg";

import { Timeline } from "../Components/Timeline";

const HomePage = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll(".animate-on-scroll")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  /* 
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  }; */

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero animate-on-scroll">
        <div className="hero-content">
          <h1 className="hero-title">
            Level Up Your Job Search with{" "}
            <span className="gradient-text">Guhuza Quizzes</span>
          </h1>
          <p className="hero-subtitle">
            Gamified quizzes to boost your skills, showcase your talent, and get
            noticed by employers!
          </p>
          <div className="hero-cta">
            <button className="cta-button glow-effect">
              Start Your First Quiz <FiArrowRight className="button-icon" />
            </button>
            <button className="cta-button secondary">
              Learn More <FiBook className="button-icon" />
            </button>
          </div>
        </div>

        <div className="hero-image">
          <img src="../src/asset/other/guhuzauser.png" alt="Career" />
        </div>
      </section>


      <Timeline
        data={[
          {
            title: "Boost Job Readiness",
            content: (
              <div className="timeline-content">
                <p>
                  Improve industry knowledge with real-world scenarios and
                  strengthen problem-solving skills.
                </p>
                <img src={stock1} />
              </div>
            ),
          },
          {
            title: "Get Noticed by Employers",
            content: (
              <div className="timeline-content">
                <p>
                  Top scorers are highlighted for potential job opportunities.
                </p>
                <img src={stock2} />
              </div>
            ),
          },
          {
            title: "Complete and Earn Rewards",
            content: (
              <div className="timeline-content">
                <p>Earn badges, certifications, and exclusive prizes.</p>

                <img src={stock3} />
              </div>
            ),
          },
          {
            title: "Track Your Progress",
            content: (
              <div className="timeline-content">
                <p>
                  Personalized scorecards and recommendations for improvement.
                </p>
                <img src={stock4} />
              </div>
            ),
          },
        ]}
      />

      {/* Features Section */}
      <Features />

      {/* CTA Section */}
      <AnimatedButton nav="/play">
        Start Now <FiArrowRight className="button-icon"/>
      </AnimatedButton>



    </div>
  );
};

export default HomePage;
