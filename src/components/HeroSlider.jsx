import React, { useState, useEffect } from 'react';

const sliderData = [
  {
    image: 'images/slider_baisakhi.jpg', 
    title: 'BAISAKHI DI SHAAM Celebration',
    subtitle: 'Celebrating culture and traditions',
  },
  {
    image: 'images/slider_cricket.jpg', 
    title: 'Inter College BBMKU Cricket Winners',
    subtitle: 'Celebrating sportsmanship and victory',
  },
  {
    image: 'images/slider_ncc.jpg', 
    title: 'NCC "At Home Function" Participants',
    subtitle: 'Dedicated NCC Cadets & Commanders',
  },
  {
    image: 'images/slider_youth_winners.jpg', 
    title: 'BBMKU Youth Festival Champions',
    subtitle: 'Winners of BBMKU Inter College Youth Festival - अंतर्नाद',
  },
  {
    image: 'images/slider_seminar.jpg', 
    title: 'ICSSR Multidisciplinary National Seminar',
    subtitle: 'G20: A Global Platform for Economic Development',
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;

  const autoScroll = true;
  let slideInterval;
  const intervalTime = 5000; 

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  return (
    <div className="slider">
      {/* Controls */}
      <div className="arrow prev" onClick={prevSlide}>
        &#10094;
      </div>
      <div className="arrow next" onClick={nextSlide}>
        &#10095;
      </div>

      <div className="slider-dots">
        {sliderData.map((_, index) => (
          <div key={index} className={`dot ${currentSlide === index ? 'current' : ''}`} onClick={() => setCurrentSlide(index)} />
        ))}
      </div>

      {/* Slides */}
      {sliderData.map((slide, index) => {
        return (
          <div
            className={index === currentSlide ? 'slide current' : 'slide'}
            key={index}
          >
            {index === currentSlide && (
              <>
                <img src={`${import.meta.env.BASE_URL}${slide.image}`} alt={slide.title} className="image" />
                <div className="content">
                  <h2>{slide.title}</h2>
                  <p>{slide.subtitle}</p>
                  <hr />
                </div>
              </>
            )}
          </div>
        );
      })}

      {/* Internal CSS for HeroSlider */}
      <style>
        {`
          /* --- 🌟 NEW: Performance & Smoothness Animations 🌟 --- */
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

          /* Animations */
          @keyframes kenburns {
            0% {
              transform: scale(1.05) translate(0, 0);
              filter: brightness(0.9);
            }
            100% {
              transform: scale(1.15) translate(-1%, -1%);
              filter: brightness(1);
            }
          }
          @keyframes contentFadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes grow-width {
            from { width: 0; }
            to { width: 80px; }
          }

          /* --- 🌟 REFINED: Main Slider Styles 🌟 --- */
          .slider {
            width: 100%;
            height: 60vh; /* Professional height */
            min-height: 450px;
            max-height: 550px;
            position: relative;
            overflow: hidden;
            background-color: #0f2347; 
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          }

          .slide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            transform: scale(1.15); /* Start slightly more zoomed in */
            transition: opacity 1.5s cubic-bezier(0.33, 1, 0.68, 1); /* Smoother fade */
            will-change: opacity, transform; /* Performance Boost */
          }

          .slide::after {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(to top, rgba(15, 35, 71, 0.6), transparent 60%); /* Darker at bottom */
            z-index: 1;
          }

          .slide.current {
            opacity: 1;
            transform: scale(1);
            transition-delay: 0.2s;
          }

          .image {
            width: 100%;
            height: 100%;
            object-fit: cover; 
            object-position: center 20%; /* Image ka focus thoda upar rakha hai taaki chehre clear dikhein */
            transition: transform 12s cubic-bezier(0.2, 0.8, 0.2, 1); /* Slower transition for smoothness */
            will-change: transform; /* Performance Boost */
          }

          .slide.current .image {
            animation: kenburns 12s ease-out forwards;
          }

          /* NAYA TEXT DESIGN: Bottom Center with Gradient */
          .content {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            text-align: center; /* Text Center me */
            color: #fff;
            /* Gradient is now on the ::after pseudo-element */
            padding: 80px 20px 30px; /* Text ko upar push karne ke liye padding */
            z-index: 2;
          }

          .content h2 {
            font-size: 2.2rem; 
            margin-bottom: 8px;
            font-weight: 800;
            letter-spacing: 0.5px;
            text-shadow: 0px 2px 15px rgba(0,0,0,0.5);
            opacity: 0;
          }

          .content p {
            font-size: 1.2rem;
            margin-bottom: 18px;
            font-weight: 500;
            color: #e2e8f0;
            text-shadow: 1px 1px 5px rgba(0,0,0,0.5);
            opacity: 0;
          }

          .content hr {
            border: 2px solid #f4a023; 
            width: 80px;
            margin: 0 auto; /* Gold line ko center me lane ke liye */
            border-radius: 4px;
            opacity: 0;
          }

          .slide.current .content h2 { animation: contentFadeInUp 0.8s 0.4s both cubic-bezier(0.2, 0.6, 0.2, 1); }
          .slide.current .content p { animation: contentFadeInUp 0.8s 0.6s both cubic-bezier(0.2, 0.6, 0.2, 1); }
          .slide.current .content hr { animation: grow-width 0.8s 0.8s both cubic-bezier(0.2, 0.6, 0.2, 1); opacity: 1; }

          /* Controls Style */
          .arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 45px;
            height: 45px;
            background-color: rgba(15, 35, 71, 0.3); /* Darker, more subtle */
            color: #fff;
            font-size: 1.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            border-radius: 50%;
            z-index: 11; /* Above the overlay */
            transition: all 0.3s;
            backdrop-filter: blur(4px); /* Glassmorphism effect */
            border: 1px solid rgba(255, 255, 255, 0.1);
            opacity: 0; /* 🌟 Hide by default */
            transform: translateY(-50%) scale(0.8);
          }

          .slider:hover .arrow {
            opacity: 1;
            transform: translateY(-50%) scale(1);
          }

          .arrow:hover {
            background-color: #f4a023; /* Hover par gold */
            color: #000;
            transform: translateY(-50%) scale(1.1); /* Keep the hover effect */
            box-shadow: 0 0 15px rgba(244, 160, 35, 0.4);
          }

          /* --- 🌟 NEW: Slide Indicator Dots 🌟 --- */
          .slider-dots {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            z-index: 11;
          }
          .dot {
            width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.4); cursor: pointer; transition: all 0.4s ease;
          }
          .dot.current {
            background: #f4a023; transform: scale(1.3); box-shadow: 0 0 10px rgba(244, 160, 35, 0.5);
          }

          .prev { left: 30px; }
          .next { right: 30px; }

          /* Mobile Responsive Adjustments */
          @media (max-width: 768px) {
            .slider {
              height: 40vh; 
              min-height: 300px;
            }

            .content {
              padding: 60px 15px 20px;
            }

            .content h2 { font-size: 1.5rem; }
            .content p { font-size: 0.95rem; margin-bottom: 12px; }
            
            .arrow {
              width: 35px; height: 35px; font-size: 1.2rem;
            }
            .prev { left: 10px; }
            .next { right: 10px; }
          }
        `}
      </style>
    </div>
  );
};

export default HeroSlider;