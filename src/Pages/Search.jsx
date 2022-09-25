import React from 'react'
import Navbar2 from '../components/Navbar2'
import Footer from '../components/Footer'
import Filter from '../components/Filter'

const Search = () => {
  return (
    <>
        <div className=" h-auto md:h-screen flex flex-col justify-between bg-zinc-100">
				<div className=' w-screen bg-zinc-100 overflow-y-auto'>
                	<Navbar2 />
					<Filter />
				</div>
				<Footer />
			</div>
    </>
  )
}

export default Search