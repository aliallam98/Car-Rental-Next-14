import { Button } from "@/components/ui/button";
import {
  ActivityIcon,
  BellElectric,
  CalendarIcon,
  ChevronRightIcon,
  ClockIcon,
  MapPinIcon,
  TrendingUpIcon,
  UsersIcon,
  Zap,
} from "lucide-react";
import Image from "next/image";

import { ICar } from "@/typings";
import Section from "@/components/Section";
import EmblaCarousel from "@/components/EmblaCarousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import BookingModel from "@/components/models/BookingModel";

interface IProps {
  carDetails: ICar;
}
const CarDetails = ({ carDetails }: IProps) => {
  const OPTIONS: EmblaOptionsType = { loop: true };
  const SLIDES = carDetails.imagesUrl;
  console.log("SLIDES", SLIDES);

  return (
    <Section>
      <div className="container">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-10">
          {carDetails.name}
        </h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="h-[600px]">
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
          </div>

          <div className="flex flex-col space-y-4 border rounded-3xl p-4 py-10 min-h-[400px]">
            <div className="flex items-center space-x-2  text-xl">
              <CalendarIcon className="w-4 h-4" />
              <span className="font-medium tracking-wide">
                Model Year: {carDetails.modelYear}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-xl">
              <TrendingUpIcon className="w-4 h-4" />
              <span className="font-medium tracking-wide">
                Horsepower: {carDetails.powerHorse}HP
              </span>
            </div>
            <div className="flex items-center space-x-2 text-xl">
              <UsersIcon className="w-4 h-4" />
              <span className="font-medium tracking-wide">
                Seater :{carDetails.seater}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-xl">
              <ActivityIcon className="w-4 h-4" />
              <span className="font-medium tracking-wide">
                Kilometers Included : {carDetails.kilometersIncluded}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-xl">
              <ActivityIcon className="w-4 h-4" />
              <span className="text-lg  font-medium tracking-wide">
                Rent Cost : ${carDetails.rentalCost}
              </span>
            </div>

            <BookingModel
              carNameAndModel={carDetails.name + "" + carDetails.modelYear}
              carId = {carDetails._id}
            >
              <Button size="lg" className="flex mx-auto w-96 gap-2 !mt-16">
                <Zap /> <span>Book Now</span>
              </Button>
            </BookingModel>
          </div>

          {/* <div className="space-y-4">
    <h3 className="text-lg font-bold">Features</h3>
    <ul className="grid gap-2 list-disc list-inside text-sm">
      <li>15-inch Touchscreen Display</li>
      <li>Premium Audio System</li>
      <li>Autopilot</li>
      <li>Heated Front Seats</li>
      <li>Wireless Phone Charging</li>
    </ul>
  </div> */}
        </div>

        <div className="space-y-4 max-w-5xl">
          <h3 className="text-lg font-bold">Description</h3>
          <p className="leading-6">{carDetails.description}</p>
        </div>
      </div>
    </Section>
  );
};

export default CarDetails;
