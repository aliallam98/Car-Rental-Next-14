import { getAllCars } from "@/actions/car.actions";
import Card from "@/components/Card";
import Pagination from "@/components/Pagination";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { ApiFeatures } from "@/lib/utils";
import { ICar, SearchParamProps } from "@/typings";
import Link from "next/link";
import React from "react";

interface IProps {
  searchParams: {
    query: string;
  };
}
const SearchPage = async ({ searchParams }: SearchParamProps) => {
  //   console.log(query);
  const x = ApiFeatures(searchParams);
  const cars = await getAllCars(x);

  return (
    <Section>
      <div className="container">
        <div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
            Search Page
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl mt-2">
            Your Looking For :{" "}
            <span className="font-semibold">{searchParams.query}</span>
          </p>
        </div>

        {cars.results.length ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,300px))] justify-center gap-4">
            {cars?.results?.map((car: ICar) => (
              <Card key={car._id} data={car} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4 justify-center items-center mt-20">
            <h1>
              There Is No Search Results Matches {searchParams.query} Try
              Another Or{" "}
            </h1>
            <Link href={"/cars"}>
              <Button>Discover All Cars</Button>
            </Link>
          </div>
        )}
        {cars.results.length > 0 && (
          <Pagination page={cars.page} totalPages={cars.totalPages} />
        )}
      </div>
    </Section>
  );
};

export default SearchPage;
