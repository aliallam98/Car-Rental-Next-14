import { getCarsByCategorySlug } from "@/actions/car.actions";
import Card from "@/components/Card";
import Section from "@/components/Section";
import { ICar } from "@/typings";
import React from "react";

interface IProps {
  params: {
    slug: string;
  };
}
const CategoryDetailsPage = async ({ params: { slug } }: IProps) => {
  const { results: cars } = await getCarsByCategorySlug(slug);
  return (
    <Section>
      <p>Your Looking For Category With slug : {slug}</p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,300px))] justify-center gap-4">
        {cars.map((car: ICar) => (
          <Card key={car._id} data={car} />
        ))}
      </div>
    </Section>
  );
};

export default CategoryDetailsPage;
