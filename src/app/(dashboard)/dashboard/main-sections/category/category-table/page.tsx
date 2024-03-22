// import path from "path";

// import { z } from "zod";

import { Button } from "@/components/ui/button";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import Link from "next/link";
import { getAllCategories } from "@/actions/category.actions";
// import { taskSchema } from "./data/schema";
// import { useEffect, useState } from "react";

export const metadata = {
  title: "Categories",
  description: "A task and issue tracker build using Tanstack Table.",
};

// Simulate a database read for tasks.

export default async function AdminCategoryPage() {
  const categories = await getAllCategories();

  if (!categories) return <p>Loading</p>;

  //Fetch Category here
  return (
    <>
      <div className=" h-full flex-1 flex-col space-y-8 p-8 md:flex ">
        <div className="flex items-center justify-between space-y-2">
          <div className="w-full">
            <h2 className="text-2xl font-bold tracking-tight text-center">
              CategoryPage
            </h2>
            <Button asChild className="block mx-auto w-64 mt-6">
              <Link
                className="text-center"
                href={"/dashboard/categories/create"}
              >
                Create New Category
              </Link>
            </Button>
          </div>
        </div>
        <DataTable data={categories} columns={columns} />
      </div>
    </>
  );
}
