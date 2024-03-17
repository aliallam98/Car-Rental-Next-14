import { cn } from "@/lib/utils";

const Section = ({ children,className }: { children: React.ReactNode,className?:string }) => {
  return (
    <section className={cn(
      "py-10 px-5 min-h-screen mt-20",
      className
    )}>{children}</section>
  );
};

export default Section;
