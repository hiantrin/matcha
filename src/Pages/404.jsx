import React from 'react'
import Lottie from "lottie-react";
import Erro404 from '../assets/error404.json'

export default function Error404() {
  return (
    <div className='flex justify-center items-center' >
          <Lottie animationData={Erro404} loop={true} autoPlay={true} style={{width : '100vh', height : '100vh'}} />

    </div>
  )
}
