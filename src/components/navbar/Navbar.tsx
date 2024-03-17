import Link from "next/link";
import NavLinks from "./NavLinks";
import SearchBar from "../SearchBar";
// import SearchForm from "./SearchForm";

const Navbar = () => {
  return (
    <header className="absolute top-0 w-full z-50 p-5 text-white bg-white/10">
      <nav className="container max-w-[1140px] flex items-center justify-between">
        {/* Logo */}
        <h1 className="font-semibold text-xl">
          <Link href={"/"}>Alfa Car</Link>
        </h1>

        {/* <SearchForm/> */}
        <SearchBar />

        {/* NavLinks */}
        <NavLinks />
      </nav>
    </header>
  );
};

export default Navbar;
