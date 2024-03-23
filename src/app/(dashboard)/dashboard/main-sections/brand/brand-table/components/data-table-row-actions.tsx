import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

// import { taskSchema } from "../data/schema";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";

interface DataTableRowActionsProps<TData extends { _id: string }> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends { _id: string; }>({
  row,
}: DataTableRowActionsProps<TData>) {
  const id = row.original._id;

  return (
    <>
      <Button variant={"ghost"} className="h-auto p-2">
        <Trash size={16} />
      </Button>
      <Button asChild variant={"ghost"} className="h-auto p-2">
        <Link href={`/dashboard/brands/${id}/edit`}>
          <Pencil size={16} />
        </Link>
      </Button>
    </>
  );
}
