import { useParams } from "react-router-dom";

import CreateCategorySubBrandForm from "../../forms/CreateCategorySubBrandForm";
import { useQuery } from "react-query";
import { fetcher } from "@/lib/utils";
import SectionSpinner from "@/components/SectionSpinner";

const UpdateCategoryPage = () => {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["Category", id],
    queryFn: () => fetcher(`/api/category/${id}`),
    refetchOnWindowFocus: false,
  });

  if (!data) {
    return <SectionSpinner />;
  }

  return (
    <>
      <CreateCategorySubBrandForm type="Category" method="Update" data={data} />
    </>
  );
};

export default UpdateCategoryPage;
