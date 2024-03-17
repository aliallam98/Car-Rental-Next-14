import Sidebar from "./_components/sidebar/Sidebar";

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex mt-20">
      <Sidebar />
      <div className="p-5">{children}</div>
    </main>
  );
};

export default AdminDashboardLayout;
