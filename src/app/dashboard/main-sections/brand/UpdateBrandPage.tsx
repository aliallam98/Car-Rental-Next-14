import { useParams } from "react-router-dom";

import CreateCategorySubBrandForm from "../../forms/CreateCategorySubBrandForm";
import { useQuery } from "react-query";
import { fetcher } from "@/lib/utils";
import SectionSpinner from "@/components/SectionSpinner";

const UpdateBrandPage = () => {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["Brand", id],
    queryFn: () => fetcher(`/api/brand/${id}`),
    refetchOnWindowFocus: false,
  });

  if (!data) {
    return <SectionSpinner />;
  }

  return (
    <>
      <CreateCategorySubBrandForm type="Brand" method="Update" data={data} />
    </>
  );
};

export default UpdateBrandPage;
