import { Skeleton } from "@/components/ui/skeleton";
import { ICategory } from "@/typings";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  category: ICategory;
}
const CategoryCard = ({ category }: IProps) => {
  return (
    <Link href={`/category/${category.slug}`}>
      <article className="bg-white max-w-[350px] h-[320px]  shadow-lg  mx-auto mt-6 object-cover object-center rounded-3xl overflow-hidden border ">
        <figure className="w-full">
          <Image
            width={350}
            height={460}
            alt={category.name}
            src={category.imageUrl!}
            className="max-h-[400px]"
          />
          <header className="p-4 text-center">
            <h4 className="text-xl font-semibold">{category.name}</h4>
            <figcaption className="text-neutral-400">
              {category.description}
            </figcaption>
          </header>
        </figure>
      </article>
    </Link>
  );
};

export default CategoryCard;

CategoryCard.Skeleton = function categoryCardSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[250px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};
