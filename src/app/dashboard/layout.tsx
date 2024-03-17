import { EdgeStoreProvider } from "@/lib/edgestore";
import Sidebar from "./_components/sidebar/Sidebar";
import Section from "@/components/Section";

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex mt-20">
      <Sidebar />
      <div className="grow p-5">
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
      </div>
    </main>
  );
};

export default AdminDashboardLayout;
