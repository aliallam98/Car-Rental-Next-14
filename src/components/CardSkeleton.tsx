import { Skeleton } from "./ui/skeleton";

const CardSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl bg-black/10" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-black/10" />
        <Skeleton className="h-4 w-[250px] bg-black/10" />
        <Skeleton className="h-4 w-[250px] bg-black/10" />
        <Skeleton className="h-4 w-[200px] bg-black/10" />
      </div>
    </div>
  );
};

export default CardSkeleton;
