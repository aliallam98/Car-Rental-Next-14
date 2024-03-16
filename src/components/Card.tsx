import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Card {
  title: string;
  description?: string;
  src: string;
  href: string;
}

function Card({ title, description, src, href }: Card) {
  return (
    <article className="max-w-[350px] max-h-[570px]  shadow-lg  mx-auto mt-6 object-cover object-center ">
      <figure className="w-full">
        <Link href={href}>
          <Image
            width={350}
            height={460}
            alt={title}
            src={src}
            className="max-h-[400px]"
          />
        </Link>
        <header className="p-4 text-center">
          <h4 className="text-xl font-semibold">{title}</h4>
          <figcaption className="text-neutral-400">{description}</figcaption>
        </header>
      </figure>
    </article>
  );
}

export default Card;
