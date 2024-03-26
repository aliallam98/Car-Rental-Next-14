"use client";

import React, { useCallback } from "react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      // @ts-ignore
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;
    // @ts-ignore
    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick);

  return (
    <section className="embla h-full w-full">
      <div className="embla__viewport  rounded-3xl border " ref={emblaRef}>
        <div className="embla__container ">
          {slides.map((image, index) => (
            <div className="embla__slide " key={index}>
              <Image
                src={`${image}`}
                className="w-full h-full object-cover"
                alt="image"
                width={500}
                height={500}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls ">
        <div className="embla__buttons">
          <PrevButton
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
            className="bg-black/10 border w-16 h-16 rounded-full flex justify-center items-center hover:bg-black/30 transition"
          />
          <NextButton
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
            className="bg-black/10 border w-16 h-16 rounded-full flex justify-center items-center hover:bg-black/30 transition"
          />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
