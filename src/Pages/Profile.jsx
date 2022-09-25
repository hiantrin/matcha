import React from 'react'
import Navbar2 from '../components/Navbar2'
import Pro from '../components/Pro'
import Footer from '../components/Footer'

const Profile = () => {
	return (
    	<div className=" h-auto md:h-screen  justify-between bg-zinc-100">
        	<div className='w-screen bg-zinc-100 overflow-y-auto'>
            	<Navbar2 />
				<Pro />
			</div>
    		<Footer />
		</div>
  )
}

export default Profile