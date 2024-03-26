import HeadingWithParagraph from "@/components/HeadingWithParagraph";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BrandCard from "./_components/BrandCard";
import Section from "@/components/Section";
import { getAllBrands } from "@/actions/brand.actions";
import { IBrand } from "@/typings";

export const metadata: Metadata = {
  title: "Brand Page",
  description: "Generated by Ali Allam",
};

const BrandPage = async () => {
  const brands = await getAllBrands();
  return (
    <Section>
      <div className="container max-w-[1140px]">
        <HeadingWithParagraph
          heading="Brands Page"
          paragraph="Here You Can Find Whatever You Want Just Take A Look"
        />
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,300px))] justify-center gap-4 mt-8">
          {brands?.map((brand:IBrand) => (
            <Link href={`brand/${brand.slug}`} key={brand._id}>
              <BrandCard brand={brand} />
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default BrandPage;
