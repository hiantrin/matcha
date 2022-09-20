import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";


const Home = () =>  {
	return (
		<>
		<div className=" h-auto md:h-screen flex flex-col justify-between bg-zinc-100">
			<div className=' w-screen bg-zinc-100 overflow-y-auto'>
				<Navbar />
				<Hero />
			</div>
			<Footer />
		</div>
		
		
		</>
	);
}

export default Home