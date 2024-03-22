import { Button } from "@/components/ui/button";
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <section className="h-full flex flex-col items-center ">
      <h1 className="mb-10 font-semibold text-2xl ">Register Page</h1>
      <Button asChild>
        <Link href={"/sign-in"}>Go To Login Page</Link>
      </Button>
      {/* <SignUp /> */}
    </section>
  );
}
