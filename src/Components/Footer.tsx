import React from "react";
import "../Styles/Footer.css";
import { Boxes } from "./BackgroundEffect";
export default function Footer() {
  return (
    <>
      <footer>
        <div className="footer-background">
          <div className="footer-mask-overlay" />
          <Boxes />
              </div>
              
              <div className="footer-content">
                  {/* footer content goes here */}
              </div>
      </footer>
    </>
  );
}
