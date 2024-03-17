import { useParams } from "react-router-dom";

import CreateCategorySubBrandForm from "../../forms/CreateCategorySubBrandForm";
import { useQuery } from "react-query";
import { fetcher } from "@/lib/utils";
import SectionSpinner from "@/components/SectionSpinner";

const UpdateSubCategoryPage = () => {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["SubCategory", id],
    queryFn: () => fetcher(`/api/sub-category/${id}`),
    refetchOnWindowFocus: false,
  });

  if (!data) {
    return <SectionSpinner />;
  }

  return (
    <>
      <CreateCategorySubBrandForm type="SubCategory" method="Update" data={data} />
    </>
  );
};

export default UpdateSubCategoryPage;
