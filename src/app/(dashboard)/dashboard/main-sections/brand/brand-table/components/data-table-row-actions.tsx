import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

// import { taskSchema } from "../data/schema";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { deleteBrand } from "@/actions/brand.actions";
import { useTransition } from "react";
import { toast } from "sonner";

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
      const res = await deleteBrand(id);
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
        <Link href={`/dashboard/brands/${id}/edit`}>
          <Pencil size={16} />
        </Link>
      </Button>
    </>
  );
}
