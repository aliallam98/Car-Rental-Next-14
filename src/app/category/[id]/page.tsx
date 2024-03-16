import React from 'react'

interface IProps {
    params:{
        id:string
    }
}
const page = ({params:{id}}:IProps) => {
  return (
    <section>
        <p>Your Looking For Category With Id : {id}</p>
    </section>
  )
}

export default page