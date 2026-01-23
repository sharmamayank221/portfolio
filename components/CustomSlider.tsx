'use client';

import { useEffect, useRef, useState } from 'react';

interface Slide {
  id: number;
  image: string;
  alt: string;
  text: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: 'https://cdn.prod.website-files.com/636b01f4514fce58703fb4a8/67bd154b35644364fb6d5dc7_Pillars.svg',
    alt: 'Illustration of multiple devices showing Tirios real estate investment platform interface',
    text: "We've streamlined the process to make it effortless. With intuitive tools and a few clicks, you can start growing your portfolio—no headaches, no confusion."
  },
  {
    id: 2,
    image: 'https://cdn.prod.website-files.com/636b01f4514fce58703fb4a8/67c60b65e7a2e4254c6e73a7_Pillars(1).svg',
    alt: 'Visual representation of secured transparent real estate transactions',
    text: "Investing in real estate shouldn't require deep pockets or exclusive access. Starting with just $100, you can unlock curated, high-potential properties tailored to your goals."
  },
  {
    id: 3,
    image: 'https://cdn.prod.website-files.com/636b01f4514fce58703fb4a8/67bd154b35644364fb6d5dc7_Pillars.svg',
    alt: 'Simplified interface showing intuitive real estate investment tools and portfolio management',
    text: 'Clear, secure, and powered by blockchain technology, your investments are protected, your fees are transparent, and your trust is prioritized.'
  },
  {
    id: 4,
    image: 'https://cdn.prod.website-files.com/636b01f4514fce58703fb4a8/67c60b65e7a2e4254c6e73a7_Pillars(1).svg',
    alt: 'real-simplicity',
    text: "It's more than a platform; it's a guide. From education to end-to-end management, you have the support and insights to invest with confidence and achieve your financial dream."
  }
];

const headings = ['Simplicity', 'Opportunity', 'Transparency', 'Empowerment'];

export default function CustomSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const headingsRef = useRef<HTMLDivElement>(null);
  const headingElementsRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1000);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    updateActiveHeading();
    updateSlidePosition();
    updateNavigationButtons();
    
    // Autoplay functionality
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
    
    autoplayIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [currentSlide, isMobile]);

  // Touch/swipe support for mobile
  useEffect(() => {
    if (!sliderRef.current || !isMobile) return;

    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next slide
          if (autoplayIntervalRef.current) {
            clearInterval(autoplayIntervalRef.current);
          }
          setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        } else {
          // Swipe right - previous slide
          if (autoplayIntervalRef.current) {
            clearInterval(autoplayIntervalRef.current);
          }
          setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
        }
      }
    };

    const slider = sliderRef.current;
    slider.addEventListener('touchstart', handleTouchStart);
    slider.addEventListener('touchend', handleTouchEnd);

    return () => {
      slider.removeEventListener('touchstart', handleTouchStart);
      slider.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile]);

  // Mousewheel support for desktop
  useEffect(() => {
    if (!sliderRef.current || isMobile) return;

    let wheelTimeout: NodeJS.Timeout | null = null;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (wheelTimeout) return;
      
      wheelTimeout = setTimeout(() => {
        wheelTimeout = null;
      }, 800);

      if (e.deltaY > 0) {
        // Scroll down - next slide
        if (autoplayIntervalRef.current) {
          clearInterval(autoplayIntervalRef.current);
        }
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      } else {
        // Scroll up - previous slide
        if (autoplayIntervalRef.current) {
          clearInterval(autoplayIntervalRef.current);
        }
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      }
    };

    const slider = sliderRef.current;
    slider.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      slider.removeEventListener('wheel', handleWheel);
      if (wheelTimeout) clearTimeout(wheelTimeout);
    };
  }, [isMobile]);

  const updateActiveHeading = () => {
    if (!headingsRef.current || headingElementsRef.current.length === 0) return;

    const activeIndex = currentSlide;
    const totalSlides = slides.length;

    // Store heading widths for mobile calculations
    const headingWidths: number[] = [];
    headingElementsRef.current.forEach((heading) => {
      if (heading) {
        headingWidths.push(heading.offsetWidth || 200);
      }
    });

    headingElementsRef.current.forEach((heading, index) => {
      if (!heading) return;

      if (isMobile) {
        // Mobile: horizontal positioning
        heading.style.top = '0';
        heading.classList.remove('hidden-heading');

        if (index === activeIndex) {
          // Active heading - position at 0, fully visible
          heading.style.display = 'block';
          heading.style.visibility = 'visible';
          heading.classList.add('active-slider-heading');
          heading.classList.remove('inactive-slider-heading');
          heading.style.left = '0';
          heading.style.opacity = '1';
          heading.style.zIndex = '10';
        } else if (index < activeIndex) {
          // Previous headings - move to the left (off-screen or special position)
          heading.classList.add('inactive-slider-heading');
          heading.classList.remove('active-slider-heading');
          const width = headingWidths[index] || 200;
          
          // Special case: when on last slide, show first heading to the right
          if (activeIndex === totalSlides - 1 && index === 0) {
            const activeWidth = headingWidths[activeIndex] || 200;
            heading.style.display = 'block';
            heading.style.visibility = 'visible';
            heading.style.left = `${activeWidth + 40}px`;
            heading.style.opacity = '0.5';
            heading.style.zIndex = '5';
          } else {
            // Move off-screen to the left and hide
            heading.style.left = `-${width + 40}px`;
            heading.style.opacity = '0';
            heading.style.zIndex = '1';
            // Hide after a brief moment to allow transition
            setTimeout(() => {
              if (heading.style.left && heading.style.left.startsWith('-')) {
                heading.style.display = 'none';
                heading.style.visibility = 'hidden';
              }
            }, 300);
          }
        } else {
          // Upcoming headings - position to the right of active heading
          heading.style.display = 'block';
          heading.style.visibility = 'visible';
          heading.classList.add('inactive-slider-heading');
          heading.classList.remove('active-slider-heading');
          
          // Calculate position: start after active heading + gap
          let leftPosition = (headingWidths[activeIndex] || 200) + 40;
          
          // Add width of all headings between active and current
          for (let i = activeIndex + 1; i < index; i++) {
            leftPosition += (headingWidths[i] || 200) + 40;
          }
          
          heading.style.left = `${leftPosition}px`;
          heading.style.opacity = '0.5';
          heading.style.zIndex = '5';
        }
      } else {
        // Desktop: vertical positioning
        heading.style.display = 'block';
        heading.classList.remove('hidden-heading');

        if (index < activeIndex) {
          heading.classList.add('hidden-heading');
          heading.style.top = '-40px';
          
          // Special case for first heading when on last slide
          if (activeIndex === totalSlides - 1 && index === 0) {
            heading.classList.remove('hidden-heading');
            heading.classList.add('inactive-slider-heading');
            heading.style.top = '40px';
          }
        } else if (index === activeIndex) {
          heading.classList.add('active-slider-heading');
          heading.classList.remove('inactive-slider-heading');
          heading.style.top = '0px';
        } else {
          heading.classList.add('inactive-slider-heading');
          heading.classList.remove('active-slider-heading');
          heading.style.top = `${(index - activeIndex) * 40}px`;
        }
      }
    });

    // Clean up hidden headings on mobile after animation
    if (isMobile) {
      setTimeout(() => {
        headingElementsRef.current.forEach((heading, index) => {
          if (index < activeIndex && !(activeIndex === totalSlides - 1 && index === 0)) {
            if (heading) heading.style.display = 'none';
          }
        });
      }, 500);
    }
  };

  const updateSlidePosition = () => {
    if (!sliderRef.current) return;

    const slideContainer = sliderRef.current.querySelector('.slider-wrapper') as HTMLElement;
    if (!slideContainer) return;

    if (isMobile) {
      slideContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    } else {
      slideContainer.style.transform = `translateY(-${currentSlide * 100}%)`;
    }
  };

  const updateNavigationButtons = () => {
    // Button states are handled via disabled attribute in JSX
  };

  const goToSlide = (index: number) => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleHeadingClick = (index: number) => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
    goToSlide(index);
  };

  return (
    <>
      <style jsx>{`
        .custom-slider-container {
          width: 70%;
          height: 380px;
          margin-bottom: 40px;
        }

        .slider-wrapper {
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: transform 0.8s ease-in-out;
        }

        .slider-slide {
          display: flex;
          align-items: flex-end;
          gap: 30px;
          min-height: 100%;
          flex-shrink: 0;
        }

        .imageparawrapper {
          display: flex;
          align-items: flex-end;
          gap: 24px;
        }
        
        .imageparawrapper p {
          margin-bottom: 0;
        }
        
        @media (max-width: 1000px) {
          .imageparawrapper p {
            margin-bottom: 40px;
          }
          
          .slider-pagination {
            bottom: 20px;
          }
        }

        .slider-heading-content-wrapper {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 40px;
          width: 100%;
        }

        .slider-pagination {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
          z-index: 10;
          align-items: center;
          justify-content: center;
        }

        .pagination-bullet {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(0, 98, 255, 0.25);
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          padding: 0;
          position: relative;
        }

        .pagination-bullet:hover {
          background: rgba(0, 98, 255, 0.5);
          transform: scale(1.2);
        }

        .pagination-bullet-active {
          width: 12px;
          height: 12px;
          background: #0062FF !important;
          border: 2px solid #0062FF;
          opacity: 1;
          box-shadow: 0 0 8px rgba(0, 98, 255, 0.5);
          transform: scale(1.3);
        }

        .pagination-bullet-active:hover {
          transform: scale(1.4);
        }

        @media (min-width: 768px) {
          .slider-pagination {
            display: none;
          }
        }

        .headings-container {
          position: relative;
          height: 340px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 30%;
          flex-shrink: 0;
        }

        .fixed-word {
          color: #0062FF;
          font-size: 32px;
          line-height: 40px;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
        }

        .slider-headings {
          margin-left: 70px;
          position: relative;
          height: 305px;
          overflow: hidden;
          width: 220px;
        }

        .slider-heading {
          font-size: 32px;
          line-height: 40px;
          color: #0062FF;
          margin: 0;
          padding: 0;
          height: 40px;
          cursor: pointer;
          transition: opacity 0.3s ease-in-out, transform 0.5s ease-in-out,
            top 0.5s ease-in-out, left 0.5s ease-in-out;
          position: absolute;
          left: 0;
          white-space: nowrap;
        }

        .active-slider-heading {
          opacity: 1;
          font-weight: 600;
        }

        .inactive-slider-heading {
          opacity: 0.5;
        }

        .hidden-heading {
          opacity: 0;
          pointer-events: none;
        }

        .slider-navigation {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
          width: 30%;
          flex-shrink: 0;
        }

        .nav-btn {
          width: 44px;
          height: 44px;
          border: 2px solid #0062FF;
          background: transparent;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #0062FF;
          transition: all 0.3s ease;
        }

        .nav-btn:hover:not(:disabled) {
          background: #0062FF;
          color: white;
          transform: scale(1.05);
        }

        .nav-btn:active:not(:disabled) {
          transform: scale(0.95);
        }

        .nav-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          transform: none;
        }

        .nav-btn:disabled:hover {
          background: transparent;
          color: #0062FF;
          transform: none;
        }

        @media (max-width: 1000px) {
          .slider-heading-content-wrapper {
            flex-direction: column;
            gap: 12px;
          }

          .headings-container {
            width: 100%;
            height: 144px;
          }

          .imageparawrapper {
            flex-direction: column;
            align-items: flex-start;
          }

          .pagination-bullet {
            background: rgba(0, 98, 255, 0.25);
            width: 10px;
            height: 10px;
          }

          .pagination-bullet-active {
            background: #0062FF !important;
            width: 12px;
            height: 12px;
            border: 2px solid #0062FF;
            box-shadow: 0 0 8px rgba(0, 98, 255, 0.5);
          }

          .custom-slider-container {
            width: 100%;
            height: 480px;
          }

          .slider-slide {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
          }

          .slider-wrapper {
            flex-direction: row;
            width: 100%;
          }

          .slider-headings {
            margin-left: 70px;
            width: calc(100% - 70px);
            height: 40px;
            overflow-x: hidden;
            overflow-y: visible;
            position: relative;
          }

          .slider-heading {
            transition: opacity 0.3s ease-in-out, transform 0.5s ease-in-out,
              left 0.5s ease-in-out;
            top: 0 !important;
            min-width: 200px;
            will-change: left, opacity;
          }

          .slider-navigation {
            width: 100%;
            justify-content: flex-start;
            margin-bottom: 20px;
            margin-top: 20px;
          }

          .nav-btn {
            width: 56px;
            height: 56px;
            border: 2px solid #0062FF;
          }

          .nav-btn svg {
            width: 24px;
            height: 24px;
          }

          .prev-btn svg {
            transform: rotate(270deg);
          }

          .next-btn svg {
            transform: rotate(-90deg);
          }
        }
      `}</style>

      <div className="slider-heading-content-wrapper">
        <div className="headings-container">
          <span className="fixed-word">Real</span>
          <div className="slider-headings" ref={headingsRef}>
            {headings.map((heading, index) => (
              <p
                key={index}
                ref={(el) => {
                  headingElementsRef.current[index] = el;
                }}
                className={`slider-heading ${
                  index === currentSlide
                    ? 'active-slider-heading'
                    : 'inactive-slider-heading'
                }`}
                onClick={() => handleHeadingClick(index)}
                style={{
                  top: isMobile ? '0px' : `${index * 40}px`,
                  left: '0px',
                }}
              >
                {heading}
              </p>
            ))}
          </div>
          <div className="slider-navigation">
            <button
              className="nav-btn prev-btn"
              onClick={goToPrevious}
              disabled={currentSlide === 0}
              aria-label="Previous slide"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 15L12 9L6 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="nav-btn next-btn"
              onClick={goToNext}
              disabled={currentSlide === slides.length - 1}
              aria-label="Next slide"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="custom-slider-container" ref={sliderRef}>
          <div className="slider-wrapper">
            {slides.map((slide) => (
              <div key={slide.id} className="slider-slide">
                <div className="imageparawrapper">
                  <img src={slide.image} alt={slide.alt} />
                  <p
                    style={{
                      color: '#00368C',
                      fontSize: '18px',
                      fontFamily: 'Roboto2',
                      lineHeight: '150%',
                    }}
                  >
                    {slide.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="slider-pagination">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`pagination-bullet ${
                  index === currentSlide ? 'pagination-bullet-active' : ''
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
