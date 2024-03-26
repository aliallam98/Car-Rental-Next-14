import { getCarById, getCarBySlug } from "@/actions/car.actions";
import React from "react";

import Section from "@/components/Section";
import RelatedVideoSection from "../_components/RelatedVideoSection";
import FAQSection from "../_components/FAQSection";
import { ICar } from "@/typings";
import CarDetails from "../_components/CarDetails";

interface IProps {
  params: {
    slug: string;
  };
}
const page = async ({ params: { slug } }: IProps) => {
  const carToFind = await getCarBySlug(slug);
  const carData: ICar = carToFind.results;

  return (
    <>
      <CarDetails carDetails={carData} />
      <RelatedVideoSection videoUrl={carData.relatedVideo as string} />
      <FAQSection />
    </>
  );
};

export default page;
