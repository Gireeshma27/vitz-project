'use client';

import React from 'react';

export default function DeviceMockups() {
  return (
    <>
      <div className="devices-showcase">
        {/* Futuristic Laptop Mockup */}
        <div className="laptop-container">
          <div className="laptop-screen-frame">
            <div className="screen-lens">
              <div className="screen-scrolling-content"></div>
            </div>
            <div className="webcam"></div>
          </div>
          <div className="laptop-base">
            <div className="base-indent"></div>
          </div>
        </div>

        {/* Floating Smartphone Mockup */}
        <div className="phone-container">
          <div className="phone-screen-frame">
            <div className="phone-scrolling-content"></div>
            <div className="phone-speaker"></div>
            <div className="phone-lens"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .devices-showcase {
          position: relative;
          width: 100%;
          max-width: 580px;
          height: 380px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* 1. Laptop Styling */
        .laptop-container {
          position: relative;
          width: 80%;
          perspective: 1000px;
          transition: transform var(--transition-medium);
        }

        .laptop-screen-frame {
          position: relative;
          background: #18181b;
          border: 12px solid #27272a;
          border-bottom-width: 16px;
          border-radius: 16px 16px 0 0;
          height: 240px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05);
          overflow: hidden;
          transition: border-color var(--transition-medium), box-shadow var(--transition-medium);
        }

        .screen-lens {
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: relative;
          background: #090a10;
        }

        .screen-lens::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 60%);
          pointer-events: none;
        }

        /* Laptop Screen Auto-Scrolling Infinite Keyframes */
        .screen-scrolling-content {
          width: 100%;
          height: 800px;
          background-image: url('/assets/hero_visualizer.png');
          background-size: cover;
          background-position: top center;
          animation: auto-scroll-laptop 16s ease-in-out infinite alternate;
        }

        @keyframes auto-scroll-laptop {
          0%, 15% { transform: translateY(0); }
          85%, 100% { transform: translateY(-560px); }
        }

        .webcam {
          position: absolute;
          top: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 5px;
          height: 5px;
          background: #0284c7;
          border-radius: 50%;
          box-shadow: 0 0 3px #0284c7;
        }

        .laptop-base {
          position: relative;
          width: 116%;
          left: -8%;
          height: 12px;
          background: #27272a;
          border-radius: 0 0 12px 12px;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
          border-bottom: 2px solid #3f3f46;
        }

        .base-indent {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 4px;
          background: #09090b;
          border-radius: 0 0 6px 6px;
        }

        /* Laptop hover effects */
        .laptop-container:hover .laptop-screen-frame {
          border-color: #3f3f46;
          box-shadow: 0 25px 50px rgba(0, 113, 227, 0.25), 0 0 35px rgba(134, 34, 230, 0.2);
        }

        /* 2. Floating Smartphone Styling */
        .phone-container {
          position: absolute;
          bottom: 10px;
          right: 15px;
          width: 110px;
          height: 220px;
          background: #18181b;
          border: 6px solid #27272a;
          border-radius: 20px;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 113, 227, 0.08);
          overflow: hidden;
          z-index: 10;
          transition: transform var(--transition-medium), border-color var(--transition-medium), box-shadow var(--transition-medium);
          animation: float-phone 4s ease-in-out infinite;
        }

        @keyframes float-phone {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .phone-screen-frame {
          position: relative;
          width: 100%;
          height: 100%;
          background: #090a10;
          overflow: hidden;
        }

        /* Phone Screen Auto-Scrolling Infinite Keyframes */
        .phone-scrolling-content {
          width: 100%;
          height: 600px;
          background-image: url('/assets/web_app_track.png');
          background-size: cover;
          background-position: top center;
          animation: auto-scroll-phone 12s ease-in-out infinite alternate;
        }

        @keyframes auto-scroll-phone {
          0%, 15% { transform: translateY(0); }
          85%, 100% { transform: translateY(-390px); }
        }

        .phone-speaker {
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 25px;
          height: 3px;
          background: #27272a;
          border-radius: 4px;
          z-index: 5;
        }

        .phone-lens {
          position: absolute;
          top: 6px;
          left: calc(50% + 20px);
          width: 4px;
          height: 4px;
          background: #10b981;
          border-radius: 50%;
          z-index: 5;
        }

        /* Phone Hover Trigger */
        .phone-container:hover {
          border-color: #3f3f46;
          box-shadow: 0 20px 40px rgba(134, 34, 230, 0.35);
          transform: scale(1.05) translateY(-5px);
        }

        @media (max-width: 600px) {
          .devices-showcase {
            height: 280px;
          }
          .laptop-screen-frame {
            height: 160px;
          }
          .screen-scrolling-content {
            height: 500px;
          }
          .laptop-container:hover .screen-scrolling-content {
            animation-duration: 10s;
          }
          .phone-container {
            width: 70px;
            height: 140px;
            bottom: 5px;
            right: 10px;
            border-width: 4px;
          }
          .phone-scrolling-content {
            height: 400px;
          }
          .phone-container:hover .phone-scrolling-content {
            animation-duration: 8s;
          }
        }
      `}</style>
    </>
  );
}
