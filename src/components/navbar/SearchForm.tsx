// 'use client'

// import { useRouter } from "next/router";
// import React, { ChangeEvent, FormEvent, useState } from "react";


// const SearchForm = () => {
//     const [searchTerm,setSearchTerm] = useState('')
//     const router = useRouter()
//     const onSubmitHandler = (e:FormEvent<HTMLFormElement>)=>{
//         e.preventDefault()
//         setSearchTerm("")
//         router.push(`search/${searchTerm}`)
//     }
//     const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
//         setSearchTerm(e.target.value)
//     }
//   return (
//     <form onSubmit={onSubmitHandler}>
//       <input
//         type="text"
//         name="searchTerm"
//         placeholder="Search"
//         className="focus:outline-none p-1"
//         onChange={onChangeHandler}
//       />
//       <button className="submit hidden">Submit</button>
//     </form>
//   );
// };

// export default SearchForm;
