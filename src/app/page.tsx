

import React from 'react'
import Hero from '@/component/Hero'
import { client } from '@/sanity/lib/client'


async function getData (){
  const fetchData = await client. fetch("");
  return fetchData
}


 export default async function Home() {

const data = await getData
console.log(data)

  return (
    <div className='w-full-2xl mx-auto'>

     <Hero/>
    </div>
  )
}


