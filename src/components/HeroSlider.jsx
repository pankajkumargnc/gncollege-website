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

      {/* Slides */}
      {sliderData.map((slide, index) => {
        return (
          <div
            className={index === currentSlide ? 'slide current' : 'slide'}
            key={index}
          >
            {index === currentSlide && (
              <>
                <img src={slide.image} alt={slide.title} className="image" />
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
            transform: scale(1.05); /* Halka sa zoom out effect fade hone par */
            transition: all 0.8s ease-in-out;
          }

          .slide.current {
            opacity: 1;
            transform: scale(1); /* Wapas normal size par */
          }

          .image {
            width: 100%;
            height: 100%;
            object-fit: cover; 
            object-position: center 20%; /* Image ka focus thoda upar rakha hai taaki chehre clear dikhein */
          }

          /* NAYA TEXT DESIGN: Bottom Center with Gradient */
          .content {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            text-align: center; /* Text Center me */
            color: #fff;
            background: linear-gradient(to top, rgba(15, 35, 71, 0.9) 0%, rgba(15, 35, 71, 0) 100%); /* Niche se dark, upar se transparent */
            padding: 80px 20px 30px; /* Text ko upar push karne ke liye padding */
          }

          .content h2 {
            font-size: 2.2rem; 
            margin-bottom: 8px;
            font-weight: 800;
            letter-spacing: 0.5px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.6); /* Text ko aur clear padhne ke liye shadow */
          }

          .content p {
            font-size: 1.2rem;
            margin-bottom: 18px;
            font-weight: 500;
            color: #e2e8f0;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.6);
          }

          .content hr {
            border: 2px solid #f4a023; 
            width: 60px;
            margin: 0 auto; /* Gold line ko center me lane ke liye */
            border-radius: 4px;
          }

          /* Controls Style */
          .arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 45px;
            height: 45px;
            background-color: rgba(255, 255, 255, 0.15);
            color: #fff;
            font-size: 1.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            border-radius: 50%;
            z-index: 10;
            transition: all 0.3s;
            backdrop-filter: blur(4px); /* Glassmorphism effect */
          }

          .arrow:hover {
            background-color: #f4a023; /* Hover par gold */
            color: #000;
            transform: translateY(-50%) scale(1.1);
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