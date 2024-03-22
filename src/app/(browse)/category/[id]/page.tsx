import { getCategoryById } from "@/actions/category.actions";
import React from "react";

interface IProps {
  params: {
    id: string;
  };
}
const CategoryDetailsPage = async({ params: { id } }: IProps) => {
  const categoryToFind = await getCategoryById(id)
  
  return (
    <section>
      <p>Your Looking For Category With Id : {id}</p>
    </section>
  );
};

export default CategoryDetailsPage;
