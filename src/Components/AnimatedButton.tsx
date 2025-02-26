import React, { useEffect, useRef, } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

interface ButtonProps {
    children: React.ReactNode;
    nav:string
}

export default function AnimatedButton({ children, nav }: ButtonProps) {
    const ref = useRef(null);
    const navigate=useNavigate()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
    
   
    
  const backgroundProgress = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "radial-gradient(circle at top center, #3b82f6 0%, #000000 0%)",
      "radial-gradient(circle at top center, #3b82f6 100%, #000000 100%)",
      "radial-gradient(circle at top center, #3b82f6 0%, #000000 0%)",
    ]
    );
    
    const handleNavigation=()=>{
        navigate(nav);
       
    }

  return (
    <section className="cta">
      <motion.button
        ref={ref}
        className="cta-button"
        style={{ background: backgroundProgress }}
        onClick={handleNavigation}      
      >
        {children}
      </motion.button>
    </section>
  );
}
