import { EdgeStoreProvider } from "@/lib/edgestore";
import Sidebar from "./_components/sidebar/Sidebar";
import {
  ClerkLoaded,
  ClerkLoading,
  ClerkProvider,
  UserButton,
  currentUser,
} from "@clerk/nextjs";
import { Spinner } from "@/components/Spinner";

const AdminDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = await currentUser();
  console.log();

  return (
    <>
      <nav className="fixed top-0 w-full flex items-center justify-between px-10 py-6 border-b backdrop-blur-sm z-50">
        <h1 className="font-semibold text-xl">Alfa Rent</h1>
        <p className="text-xl">{user?.emailAddresses[0].emailAddress}</p>
        {
          <>
            <ClerkLoading>
              <Spinner size={"lg"} />
            </ClerkLoading>
            <ClerkLoaded>
              <UserButton />
            </ClerkLoaded>
          </>
        }
      </nav>
      <main className="flex">
        <div className="mt-20 flex ">
          <Sidebar />
        </div>
        <div className="flex-1 p-5 pt-28">
          <EdgeStoreProvider>
            <div className="mx-auto">{children}</div>
          </EdgeStoreProvider>
        </div>
      </main>
    </>
  );
};

export default AdminDashboardLayout;
