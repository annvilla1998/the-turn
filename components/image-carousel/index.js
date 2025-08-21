import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { GlobalStyles } from "@mui/material";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

const images = [
  "/images/drinks.jpg",
  "/images/bay.jpg",
  "/images/inside.jpg",
  "/images/sofa.jpg",
  "/images/led.jpg"
];

export const ImageCarousel = () => {
  return (
    <>
      <GlobalStyles
        styles={{
          ".swiper": {
            width: "100%",
            height: "500px"
          },
          ".swiper-slide": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          },
          ".swiper-slide img": {
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }
        }}
      />
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true
        }}
        loop={true}
        modules={[Autoplay, Pagination]}
        className="carousel"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
