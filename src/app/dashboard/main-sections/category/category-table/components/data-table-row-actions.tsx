import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

// import { taskSchema } from "../data/schema";
import { Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const id = row.original._id;
  console.log(id);

  return (
    <>
      <Button variant={"ghost"} className="h-auto p-2">
        <Trash size={16} />
      </Button>
      <Button asChild variant={"ghost"} className="h-auto p-2">
        <Link to={`/dashboard/admin/category/${id}/update`}>
          <Pencil size={16} />
        </Link>
      </Button>
    </>
  );
}
