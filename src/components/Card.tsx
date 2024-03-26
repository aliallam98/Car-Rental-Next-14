import { ICar } from "@/typings";
import { Banknote, Calendar, Car, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Card {
  data: ICar;
}

function Card({ data }: Card) {
  return (
    <article className="max-w-[350px] max-h-[570px]  shadow-lg  mx-auto mt-6 object-cover object-center rounded-3xl overflow-hidden border ">
      <figure className="w-full">
        <Link href={`/car/${data.slug}`}>
          <Image
            width={350}
            height={460}
            alt={"CarImage"}
            src={data.imagesUrl[0]}
            className="w-full h-[300px] object-contain"
          />
        </Link>
        <header className="p-4 text-start">
          <h4 className="text-xl font-semibold capitalize">{data.name}</h4>
          {/* <figcaption className="text-neutral-400">
            {data.description?.split(" ").slice(0, 8).join(" ")}
          </figcaption> */}
          <div className="p-2 mt-2 flex justify-between items-center">
            <div className="flex gap-4">
              <span>
                <Calendar color="#44f3bf" />
              </span>
              <span>{data.modelYear}</span>
            </div>
            <div className="flex gap-4">
              <span>
                <Users color="#44f3bf" />
              </span>{" "}
              <span>{data.seater}</span>
            </div>
            <div className="flex gap-4">
              <span>
                <Car color="#44f3bf" />
              </span>{" "}
              <span>{data.powerHorse} </span>
            </div>
          </div>
          <div className="flex gap-4 border-t-2 p-2">
            <span className="flex gap-2">
              <Banknote color="#44f3bf" /> Rental Cost
            </span>{" "}
            <span>{data.rentalCost} $</span>
          </div>
        </header>
      </figure>
    </article>
  );
}

export default Card;
