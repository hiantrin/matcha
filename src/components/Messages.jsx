import React from 'react'
import { useEffect } from 'react'
import getInstance from './instances/help2'
import { useState } from 'react'

const Messages = () => {
    const token = localStorage.getItem('authToken');
	const [users, setUsers] = useState([]);
	const [trans, setTrans] = useState(false);
	const [chat, setChat] = useState({})

    useEffect(() => {
        const getMessage = async () => {
            const res = await getInstance(token).get("/getConnectedUsers", {

            });
            setUsers(res.data.connectedUsers);
        }
        getMessage();
    }, [])

	const toChat = (element) => {
		setTrans(!trans)
		setChat(element)
	}

	console.log(chat)
	const map = 
	<div className={`w-full flex flex-col items-center justify-between space-y-4 + ${trans ? 'Tran' : ''}`}>
		{users.map((element, id) => {
			return(
				<div className='min-w-[350px] p-4 flex bg-white rounded-xl items-center  cursor-pointer' onClick={() => toChat(element)} key={id}>
					<img src={element.profile_img} className="border rounded-full mr-5 w-12 h-12"></img>
					<h1 className='text-sm text-black font-bold'>{element.user_name}</h1>
				</div>
		)})}
	</div>
  return (
    <div className='w-full pt-52 px-[5%] md:px-[15%] flex flex-col items-center space-y-10'>
        <h1 className='text-4xl font-bold'>Chat.</h1>
		{map}
		<div className={trans ? 'flex flex-col space-y-4' : "hidden"}>
			<div className='min-w-[350px] p-4 flex bg-white rounded-xl items-center'>
				<img src={chat.profile_img} className="border rounded-full mr-5 w-12 h-12"></img>
				<h1 className='text-sm text-black font-bold'>{chat.user_name}</h1>
			</div>
			<div className='rounded-xl w-full h-[500px] bg-white p-3 flex flex-col justify-between space-y-3'> 
				<div className='h-[85%] w-full bg-gray-100'></div>
				<div className='h-[15%] w-full bg-gray-200 rounded-3xl'>
					
				</div>
			</div>
		</div>
    </div>
  )
}

export default Messages