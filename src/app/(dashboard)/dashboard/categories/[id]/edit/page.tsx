import { getCategoryById } from "@/actions/category.actions";
import { notFound } from "next/navigation";
import CreateCategoryAndBrandForm from "../../../_components/forms/CreateCategoryAndBrandForm";

interface IProps {
  params: { id: string };
}

const CategoryEditPage = async ({ params: { id } }: IProps) => {
  const category = await getCategoryById(id);
  if (!category.success) {
    return notFound();
  }

  return <CreateCategoryAndBrandForm type="Category" method="Update" data={category.results}/>
};

export default CategoryEditPage;
