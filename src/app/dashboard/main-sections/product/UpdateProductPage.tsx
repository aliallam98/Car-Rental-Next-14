import { useParams } from "react-router-dom";

import { useQuery } from "react-query";
import { fetcher } from "@/lib/utils";
import SectionSpinner from "@/components/SectionSpinner";
import CreateProductForm from "../../forms/CreateProductForm";

const UpdateProductPage = () => {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["Product", id],
    queryFn: () => fetcher(`/api/product/${id}`),
    refetchOnWindowFocus: false,
  });

  if (!data) {
    return <SectionSpinner />;
  }

  return (
    <>
      <CreateProductForm method="Update" data={data} />
    </>
  );
};

export default UpdateProductPage;
