import { getCarById } from "@/actions/car.actions";
import React from "react";
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
import Section from "@/components/Section";
import RelatedVideoSection from "../_components/RelatedVideoSection";
import FAQSection from "../_components/FAQSection";

interface IProps {
  params: {
    id: string;
  };
}
const page = async ({ params: { id } }: IProps) => {
  // const carToFind = await getCarById(id);

  return (
    <>
      <Section>
        <div className="container">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
            2023 Tesla Model S
          </h1>
          <div className="grid md:grid-cols-2 gap-6">
            <div></div>

            <div className="flex flex-col space-y-4 border rounded-3xl p-4 py-10 min-h-[400px]">
              <div className="flex items-center space-x-2  text-xl">
                <CalendarIcon className="w-4 h-4" />
                <span className="font-medium tracking-wide">
                  Model Year: 2023
                </span>
              </div>
              <div className="flex items-center space-x-2 text-xl">
                <TrendingUpIcon className="w-4 h-4" />
                <span className="font-medium tracking-wide">
                  Horsepower: 1,020 HP
                </span>
              </div>
              <div className="flex items-center space-x-2 text-xl">
                <UsersIcon className="w-4 h-4" />
                <span className="font-medium tracking-wide">Seater :4</span>
              </div>
              <div className="flex items-center space-x-2 text-xl">
                <ActivityIcon className="w-4 h-4" />
                <span className="font-medium tracking-wide">
                  Kilometers Included : 5,000 km
                </span>
              </div>
              <div className="flex items-center space-x-2 text-xl">
                <ActivityIcon className="w-4 h-4" />
                <span className="text-lg  font-medium tracking-wide">
                  Rent Cost : $99,999/day
                </span>
              </div>

              <Button size="lg" className="flex mx-auto w-96 gap-2 !mt-16">
                <Zap /> <span>Book Now</span>
              </Button>
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
            <p className="leading-6">
              The Tesla Model S is a fully electric sedan with a sleek design
              and cutting-edge technology. It offers a luxurious and comfortable
              driving experience with its spacious interior and advanced
              features. The Model S is also known for its impressive
              performance, with quick acceleration and responsive handling.
              Whether youre commuting to work or taking a road trip, the Tesla
              Model S delivers an eco-friendly and enjoyable driving experience.
            </p>
          </div>
        </div>
      </Section>
      <RelatedVideoSection />
      <FAQSection />
    </>
  );
};

export default page;
