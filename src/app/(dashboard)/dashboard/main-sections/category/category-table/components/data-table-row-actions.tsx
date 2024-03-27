"use client";

import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

// import { taskSchema } from "../data/schema";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { deleteCategory } from "@/actions/category.actions";
import { useTransition } from "react";

interface DataTableRowActionsProps<TData extends { _id: string }> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends { _id: string }>({
  row,
}: DataTableRowActionsProps<TData>) {
  const id = row.original._id;
  const [isPending, startTransition] = useTransition();

  const onClickHandler = async () => {
    startTransition(async () => {
      const res = await deleteCategory(id);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <>
      <Button
        variant={"ghost"}
        className="h-auto p-2"
        onClick={onClickHandler}
        disabled={isPending}
      >
        <Trash size={16} />
      </Button>
      <Button asChild variant={"ghost"} className="h-auto p-2">
        <Link href={`/dashboard/categories/${id}/edit`}>
          <Pencil size={16} />
        </Link>
      </Button>
    </>
  );
}
