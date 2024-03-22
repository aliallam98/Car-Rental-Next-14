import Image from "next/image";
import React from "react";
import Link from "next/link";
import { contactUs, navLinksArr } from "@/constants";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <footer className="py-4 border-t">
      <div className="container max-w-[1140px]">
        <div className=" grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold">Alfa Rent</h1>
            <p className="max-w-[250px]">
              Alfa Car Rental is the best luxury car rental company , providing
              the top new cars in the market, we have a big fleet of 120+ sport
              and luxury cars, we are known for the professional service we
              provide along with the best rates.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold">Links</h1>
            <ul className="flex flex-col ">
              {navLinksArr.map((item, i) => (
                <li key={i}>
                  <Link href={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold">Contact Us</h1>
            <ul className="flex flex-col gap-2">
              {contactUs.map(({ label, icon: Icon }, i) => (
                <li key={i} className="flex items-center gap-4">
                  <span>
                    <Icon />
                  </span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold">Newsletters</h1>
            <Input className=" border-black" placeholder="Your Email" />
            <Button>Submit</Button>
          </div>
        </div>

        <div className="flex justify-between items-center border-t-2 mt-4 pt-2">
          <span>&copy; Alfa Rental All Rights Reserved.</span>
          <Image
            src={"/CreditCardIcons.webp"}
            width={300}
            height={40}
            alt="image"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
