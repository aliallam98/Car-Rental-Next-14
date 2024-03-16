import Link from "next/link";
import NavLinks from "./NavLinks";
// import SearchForm from "./SearchForm";


const Navbar = () => {
  return (
    <header>
      <nav className="container max-w-[1140px] p-2   flex items-center justify-between bg-gray-600/20">
        {/* Logo */}
        <Link href={"/"}>Logo</Link>
        {/* NavLinks */}
        <NavLinks/>
        {/* <SearchForm/> */}
      </nav>
    </header>
  );
};

export default Navbar;
