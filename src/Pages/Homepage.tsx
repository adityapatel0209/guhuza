import { useEffect } from 'react';
import React from 'react';
import Slider from 'react-slick';
import { FiAward, FiBarChart, FiUsers, FiClock, FiBook, FiCheckCircle, FiTrendingUp, FiTarget, FiArrowRight } from 'react-icons/fi';
import '../Styles/HomePage.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import stock1 from "../asset/other/stock2.webp"
import stock2 from "../asset/other/stock1.webp" 
import stock3 from "../asset/other/stock4.jpg"  
import stock4 from "../asset/other/stock5.jpg" 

const HomePage = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero animate-on-scroll">
        <div className="hero-content">
          <h1 className="hero-title">
            Level Up Your Job Search with <span className="gradient-text">Guhuza Quizzes</span>
          </h1>
          <p className="hero-subtitle">
            Gamified quizzes to boost your skills, showcase your talent, and get noticed by employers!
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

      {/* Why Guhuza Section */}
      <section className="why-guhuza animate-on-scroll">
        <h2 className="section-title">Why Take Guhuza Quizzes?</h2>
        <Slider {...settings}>
          <div className="carousel-card">
            <img src={stock1} alt="Boost Job Readiness" />
            <div className="carousel-content">
              <h3>Boost Job Readiness</h3>
              <p>Improve industry knowledge with real-world scenarios and strengthen problem-solving skills.</p>
            </div>
          </div>
          <div className="carousel-card">
            <img src={stock2} alt="Get Noticed by Employers" />
            <div className="carousel-content">
              <h3>Get Noticed by Employers</h3>
              <p>Top scorers are highlighted for potential job opportunities.</p>
            </div>
          </div>
          <div className="carousel-card">
            <img src={stock3} alt="Compete & Earn Rewards" />
            <div className="carousel-content">
              <h3>Compete & Earn Rewards</h3>
              <p>Earn badges, certifications, and exclusive prizes.</p>
            </div>
          </div>
          <div className="carousel-card">
            <img src={stock4} alt="Track Your Progress" />
            <div className="carousel-content">
              <h3>Track Your Progress</h3>
              <p>Personalized scorecards and recommendations for improvement.</p>
            </div>
          </div>
        </Slider>
      </section>

      {/* Features Section */}
      <section className="features animate-on-scroll">
        <h2 className="section-title">Features of Guhuza Quizzes</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FiBarChart className="feature-icon" />
            <h3>Scorecard & Insights</h3>
            <p>Real-time performance tracking and personalized tips.</p>
          </div>
          <div className="feature-card">
            <FiCheckCircle className="feature-icon" />
            <h3>Sidebar Navigation</h3>
            <p>Easy access to questions and progress tracking.</p>
          </div>
          <div className="feature-card">
            <FiAward className="feature-icon" />
            <h3>Levels & Achievements</h3>
            <p>Unlock levels and earn badges for your skills.</p>
          </div>
          <div className="feature-card">
            <FiClock className="feature-icon" />
            <h3>Learning & Challenge Modes</h3>
            <p>Practice at your pace or compete in timed quizzes.</p>
          </div>
          <div className="feature-card">
            <FiUsers className="feature-icon" />
            <h3>Community Support</h3>
            <p>Join a community of learners and share your progress.</p>
          </div>
          <div className="feature-card">
            <FiBook className="feature-icon" />
            <h3>Extensive Resources</h3>
            <p>Access a library of resources to help you prepare.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta animate-on-scroll">
        <h2>Your Dream Job is Just a Quiz Away!</h2>
        <button className="cta-button glow-effect">
          Start Now <FiArrowRight className="button-icon" />
        </button>
      </section>
    </div>
  );
};

export default HomePage;