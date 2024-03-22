import Card from "@/components/Card";
import HeadingWithParagraph from "@/components/HeadingWithParagraph";
import { Metadata } from "next";
import React from "react";
import CategoryCard from "./_components/CategoryCard";
import { getAllCategories } from "@/actions/category.actions";

export const metadata: Metadata = {
  title: "Category Page",
  description: "Generated by Ali Allam",
};

const CategoryPage = async() => {
  const categories = await getAllCategories()

  return (
    <section className="py-5 md:py-10">
      <div className="container max-w-[1140px]">
        <HeadingWithParagraph
          heading="Luxury & Sports Car Rental"
          paragraph="We Offer High-End New Cars, Full option Vehicles."
        />

        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,300px))] justify-center gap-4">
          {categories.map((category, i) => (
            <CategoryCard category={category} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;