import { getBrandById } from '@/actions/brand.actions'
import React from 'react'

interface IProps {
    params:{
        id:string
    }
}
const page = async({params:{id}}:IProps) => {
  const brandToFind = await getBrandById(id)

  return (
    <section>
        <p>Your Looking For Brand With Id : {id}</p>
    </section>
  )
}

export default page