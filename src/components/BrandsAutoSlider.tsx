"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "../app/globals.css";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";
import { IBrand } from "@/typings";

interface IProps {
  brands: IBrand[];
}
function BrandsAutoSlider({ brands }: IProps) {
  return (
    <>
      <section className="pt-10 brandsSliderSection">
        <div className="container max-w-[1140px]">
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={30}
            grabCursor={true}
            loop={true}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            //   navigation={true}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 2,
              },
              640: {
                slidesPerView: 3,
              },
              800: {
                slidesPerView: 4,
              },
              1000: {
                slidesPerView: 5,
              },
            }}
            modules={[Autoplay, Pagination]}
            className="SwiperMany"
          >
            {brands.map((brand, i) => (
              <SwiperSlide
                key={brand._id}
                className="flex flex-col items-center justify-center h-[200px] cursor-pointer"
              >
                <Link
                  href={`/brand/${brand.slug}`}
                  className="border rounded-3xl w-full h-full"
                >
                  <Image
                    src={brand.imageUrl}
                    width={120}
                    height={120}
                    alt="brandImage"
                    className="w-full h-full object-contain"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}

export default BrandsAutoSlider;
