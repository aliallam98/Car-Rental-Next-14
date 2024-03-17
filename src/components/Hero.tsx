"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// import required modules
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import HeadingWithParagraph from "./HeadingWithParagraph";
import Button from "./Button";

const images = ["/483055.jpg", "/483077.jpg"];

const Hero = () => {
  return (
    <>
      <section className="relative overflow-hidden h-screen">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop
          speed={3000}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {images.map((image, i) => (
            <SwiperSlide key={i}>
              <Image
                src={image}
                alt={`hero image ${i}`}
                width={1920}
                height={1080}
                className="max-h-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute inset-0 z-20 bg-black/60" />
        <div className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center space-y-8 ">
          <h1 className="text-5xl">{`Dubai's #1 Luxury Car Rental`}</h1>
          <p className="text-xl">
            Rent your dream car on daily or hourly basis.
          </p>
          <Button title="Rent Now" />
        </div>
      </section>
    </>
  );
};

export default Hero;
