"use client"

import { SignIn } from '@clerk/clerk-react'
import React from 'react'

const page = () => {
  return (
    <div className='flex-center glassmorphism-auth h-screen w-full'>
        <SignIn />
    </div>
  )
}

export default page
