import React from 'react'


interface IProps {
    params:{
        searchTerm:string
    }
}

const SearchPage = ({params:{searchTerm}}:IProps) => {
  return (
    <section>
        <h3>Search Page</h3>
        <p>Your Looking For : {searchTerm}</p>
    </section>
  )
}

export default SearchPage