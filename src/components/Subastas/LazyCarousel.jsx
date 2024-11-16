/* eslint-disable react/prop-types */

import { useEffect } from "react";
import { useRef } from "react";

const LazyCarousel = ({ imgs, size }) => {
  const carouselRef = useRef(null);
  const carouselId = `carousel-${Math.random() * 100}`;

  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (carouselElement) {
      // Initialize the Bootstrap carousel
      const carouselInstance = new window.bootstrap.Carousel(carouselElement);

      const handleSlide = (event) => {
        const lazy = event.relatedTarget.querySelector("img[data-src]");
        lazy.setAttribute("src", lazy.getAttribute("data-src"));
        lazy.removeAttribute("data-src");
      };

      carouselElement.addEventListener("slide.bs.carousel", handleSlide);

      return () => {
        carouselElement.removeEventListener("slide.bs.carousel", handleSlide);
      };
    }
  }, []);

  return (
    <div id={carouselId} className="carousel slide" ref={carouselRef}>
      <div className="carousel-inner">
        {imgs.map((img, index) => {
          const imgProps = index === 0 ? { src: img } : { "data-src": img };
          const item = (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              style={{ height: size? 400 : 200 }}
              key={index}
            >
              <img
                {...imgProps}
                alt={`Imagen`}
                className="w-100 h-100 object-fit"
              />
            </div>
          );

          return item;
        })}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={`#${carouselId}`}
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={`#${carouselId}`}
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default LazyCarousel;
