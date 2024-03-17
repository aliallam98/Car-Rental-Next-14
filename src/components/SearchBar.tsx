"use client";

import { SearchIcon, X } from "lucide-react";
import queryString from "query-string";
import { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query) return;

    const url = queryString.stringifyUrl(
      {
        url: "/search",
        query: { query: query },
      },
      { skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <form
      className="relative flex items-center w-full md:w-[400px] "
      onSubmit={onSubmitHandler}
    >
      {query && (
        <X
          className="absolute right-14 w-5 h-5 text-muted-foreground
            cursor-pointer hover:opacity-75"
          color="#ffffff"
          onClick={() => setQuery("")}
        />
      )}
      <Input
        className="border-r-none bg-transparent border-white/10 placeholder:text-white"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button
        className="border-l-none hover:bg-white/10"
        size={"sm"}
        variant={"ghost"}
        type="submit"
      >
        <SearchIcon
          size={16}
          className="text-muted-foreground"
          color="#ffffff"
        />
      </Button>
    </form>
  );
};

export default SearchBar;
