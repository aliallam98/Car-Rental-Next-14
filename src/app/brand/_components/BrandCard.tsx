import { IBrand } from "@/typings";
import Image from "next/image";


interface IProps {
    brand:IBrand
}
const BrandCard = ({brand}:IProps) => {
  return (
    <article className="w-60 h-60 p-5 text-center shadow-lg mx-auto">
      <figure>
        <Image
          className="w-40 h-40 object-contain mx-auto"
          width={150}
          height={150}
          alt={brand.name}
          src={brand.imageUrl}
        />
      </figure>
      <h3 className="p-2 mt-2 border-t-1 border-black text-lg font-medium">
        {brand.name}
      </h3>
    </article>
  );
};

export default BrandCard;


BrandCard.Skeleton = function brandCardSkeleton(){
    return 
} 
