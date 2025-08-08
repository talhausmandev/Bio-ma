import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-lime-100 flex justify-between p-5 items-center'>
        <div className="logo font-extrabold font-sans text-4xl">
            Bio<span className='text-lime-600'>.ma</span>
        </div>
        <div className="nav">
            <ul className='flex gap-5 items-center'>
                <li><Link href={"/"}>Home</Link></li>
                <li><Link href={"https://talhausman.netlify.app"}>About</Link></li>
                <li><Link href={"/https://talhausman.netlify.app"}>Contact Us</Link></li>
                <li className='bg-lime-500 text-black font-bold py-2 px-3 rounded-2xl'><Link href={"/create-new-bio"}>Create new Bio</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar