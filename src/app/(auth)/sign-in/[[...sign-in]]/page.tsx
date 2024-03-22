import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="h-full flex flex-col items-center ">
      <h1 className="mb-10 font-semibold text-2xl ">Login Page</h1>
      <SignIn />
    </section>
  );
}
