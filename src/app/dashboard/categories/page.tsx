import { Button } from "@/components/ui/button";
import Link from "next/link";

const CategoriesPage = () => {
  return (
    <section>
      <h1 className="text-3xl font-semibold">Category Page</h1>
      <Link
        href={"categories/create"}
        className="block mt-8 mx-auto  text-center"
      >
        <Button className="w-64">Create Category</Button>
      </Link>
    </section>
  );
};

export default CategoriesPage;
