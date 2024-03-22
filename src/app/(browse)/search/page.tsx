import Section from "@/components/Section";
import React from "react";

interface IProps {
  searchParams: {
    query: string;
  };
}
const SearchPage = ({ searchParams: { query } }: IProps) => {
//   console.log(query);

  return (
    <Section>
      <div className="container">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
          Search Page
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl mt-2">
          Your Looking For : <span className="font-semibold">{query}</span>
        </p>
      </div>
    </Section>
  );
};

export default SearchPage;
