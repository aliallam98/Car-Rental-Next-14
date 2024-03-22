const AuthPagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="h-screen flex flex-col justify-center items-center pt-20">
      {children}
    </section>
  );
};

export default AuthPagesLayout;
