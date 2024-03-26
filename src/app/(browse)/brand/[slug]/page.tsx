import { getCarsByBrandSlug } from "@/actions/car.actions";
import Card from "@/components/Card";
import Section from "@/components/Section";
import { ICar } from "@/typings";
import React from "react";

interface IProps {
  params: {
    slug: string;
  };
}
const page = async ({ params: { slug } }: IProps) => {
  const res = await getCarsByBrandSlug(slug);
  const cars = res.success ? res.results : [];
  return (
    <Section>
      <div className="container max-w-[1140px]">
        <h2 className="font-semibold text-xl md:text-3xl capitalize">
          Brand: {slug}
        </h2>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,300px))] justify-center gap-4">
          {cars.map((car: ICar) => (
            <Card key={car._id} data={car} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default page;
