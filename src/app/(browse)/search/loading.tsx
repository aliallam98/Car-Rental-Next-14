import Section from "@/components/Section";

import CardSkeleton from "@/components/CardSkeleton";

const loading = () => {
  return (
    <Section>
      <div className="container grid grid-cols-[repeat(auto-fill,minmax(250px,300px))] justify-center gap-4">
        {[...Array(6)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </Section>
  );
};

export default loading;
