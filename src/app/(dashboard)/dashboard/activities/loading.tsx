import Section from "@/components/Section";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <Section>
      <div className="flex flex-col gap-4">
        {[...Array(4)].map((_, i) => (
          <div className="flex items-center gap-x-4" key={i}>
            <Skeleton className="w-8 h-8 rounded-full bg-black/10 " />
            <div className="flex-1 space-y-2">
              <Skeleton className="w-[50%] h-5 bg-black/10 " />
              <Skeleton className="w-[30%] h-5  bg-black/10" />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default loading;
