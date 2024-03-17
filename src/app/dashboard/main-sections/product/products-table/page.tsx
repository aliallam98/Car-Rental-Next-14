// import path from "path";

// import { z } from "zod";

import { Button } from "@/components/ui/button";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
// import { taskSchema } from "./data/schema";
// import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetcher } from "@/lib/utils";

// eslint-disable-next-line react-refresh/only-export-components
export const metadata = {
  title: "Categories",
  description: "A task and issue tracker build using Tanstack Table.",
};

// Simulate a database read for tasks.

export default function AdminProductsPage() {
  const { data } = useQuery({
    queryKey: "Products",
    queryFn: () => fetcher("/api/product"),
    staleTime:1000 * 60 * 60 ,
    refetchOnWindowFocus:false
  });

  if (!data) return <p>Loading</p>;
  return (
    <>
      <div className=" h-full flex-1 flex-col space-y-8 p-8 md:flex ">
        <div className="flex items-center justify-between space-y-2">
          <div className="w-full">
            <h2 className="text-2xl font-bold tracking-tight text-center">
              Products Page
            </h2>
            <Button asChild className="block mx-auto w-64 mt-6">
              <Link className="text-center" to={"create"}>
                Create New Product
              </Link>
            </Button>
          </div>
        </div>
        <DataTable data={data} columns={columns} />
      </div>
    </>
  );
}
