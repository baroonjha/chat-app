import { useState,useEffect} from 'react'
import './App.css'
import io from 'socket.io-client'
import {nanoid} from 'nanoid'

const socket  = io("https://chat-app-backend-pied.vercel.app/")
const userName = nanoid(4)

function App() {
  const [message, setMessage] = useState('')
  const [chat,setChat] = useState([])

  const sendChat = (e)=>{
        e.preventDefault()
        // event name must be same as backend like we have given chat in backend
        socket.emit("chat",{message,userName})
        setMessage('')
  }

  useEffect(()=>{
    socket.on("chat",(payload)=>{
      setChat([...chat,payload])
    })
  })


  return (
    <>
     <h2>Chatty</h2>
      {chat.map((payload,index)=>{
            return (
              // here doing like destructuring from payload we have sent in line 16
              <p key={index}>{payload.message}<span>id:{payload.userName}</span></p>
            )
      })}
     <form onSubmit={sendChat}>
      <input type="text" name='chat' placeholder='send text' value={message} onChange={(e)=>{
        setMessage(e.target.value)
      }} />
      <button type='submit'>Send</button>
     </form>
      
    </>
  )
}

export default App
