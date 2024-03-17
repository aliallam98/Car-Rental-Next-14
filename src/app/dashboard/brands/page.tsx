import { Button } from "@/components/ui/button";
import Link from "next/link";

const BrandsPage = () => {
  return (
    <section>
      <h1 className="text-3xl font-semibold">Brand Page</h1>
      <Link href={"brands/create"} className="block mt-8 mx-auto  text-center">
        <Button className="w-64">Create Brand</Button>
      </Link>
    </section>
  );
};

export default BrandsPage;
