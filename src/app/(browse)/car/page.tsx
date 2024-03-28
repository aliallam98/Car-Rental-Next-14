import { getAllCars } from "@/actions/car.actions";
import Card from "@/components/Card";
import CardSkeleton from "@/components/CardSkeleton";
import HeadingWithParagraph from "@/components/HeadingWithParagraph";
import Pagination from "@/components/Pagination";
import Section from "@/components/Section";
import { ApiFeatures } from "@/lib/utils";
import { ICar, SearchParamProps } from "@/typings";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Car Page",
  description: "Generated by Ali Allam",
};

const CarPage = async ({ searchParams }: SearchParamProps) => {
  const x = ApiFeatures(searchParams);
  const cars = await getAllCars(x);

  return (
    <Section>
      <div className="container max-w-[1140px]">
        <HeadingWithParagraph
          heading="Luxury & Sports Car Rental"
          paragraph="We Offer High-End New Cars, Full option Vehicles."
        />

        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,300px))] justify-center gap-4">
          {cars?.results?.map((car: ICar) => (
            <Card key={car._id} data={car} />
          ))}
        </div>

        <Pagination totalPages={cars.totalPages} page={cars.page} />
      </div>
    </Section>
  );
};

export default CarPage;
