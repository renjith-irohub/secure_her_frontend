import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
  const slides = [
    {
      title: "ENSURING WOMEN'S SAFETY EVERYWHERE",
      text: "Empowering women with real-time location tracking, distress signals, and community support for a safer world.",
    },
    {
      title: "INSTANT DISTRESS SIGNALS",
      text: "With just one tap, send emergency alerts to trusted contacts and authorities, sharing your real-time location for swift assistance.",
    },
    {
      title: "SAFE ROUTES & COMMUNITY SUPPORT",
      text: "Plan safer routes and connect with a supportive community to navigate public spaces with confidence.",
    },
  ];

  return (
    <div
      className="py-50"
      style={{
        backgroundImage: "url('/images/women-bg.jpg')", // Replace with your image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full mx-auto px-4">
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          interval={2000}
          showStatus={false}
        >
          {slides.map((slide, index) => (
            <div key={index} className="text-center py-16">
              <h1 className="text-5xl font-extrabold mb-6 tracking-wide text-red-400">
                {slide.title}
              </h1>
              <p className="text-xl mb-8 max-w-4xl mx-auto leading-relaxed text-red-1000">
                {slide.text}
              </p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Banner;
