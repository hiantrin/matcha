import {React} from 'react'
import Navbar from '../components/Navbar'
import Signin from '../components/Signin'
import Footer from '../components/Footer'
import Down from '../components/Down'

const Auth = () => {


  return (
	<>
		{/* <div className=" h-auto md:h-screen flex flex-col justify-between bg-zinc-100">
			<div className=' w-screen bg-zinc-100 overflow-y-auto'> */}
				<Navbar />
				<Signin />
				<Down  name="Sign in"/>
				<Footer />
			{/* </div>
			<Footer />
		</div> */}
	</>
  )
}

export default Auth