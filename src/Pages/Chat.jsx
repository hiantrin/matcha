import React from 'react'
import Navbar2 from '../components/Navbar2'
import Footer from '../components/Footer'
import Messages from '../components/Messages'

const Chat = () => {
  return (
    <div className="relative flex flex-col h-auto md:h-screen  justify-between bg-zinc-100">
      <Navbar2 />
      <Messages />
      <Footer />
    </div>
  )
}

export default Chat