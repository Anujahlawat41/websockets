import { useEffect, useState } from 'react'
import './App.css'

function App() {
  //inatisalise a socketvaribale and added some extra type in parameter and also insaise to null if not connected goes to !socket
  const [socket, setsocket] = useState<null | WebSocket>(null)
  const [latestmessage,setlatestmessage]=useState("")
  const [message, setmessage]=useState("")
  // we have use effect that said any time component mount create a fresh websocket 
  //and any time when its open it set the variable now we can get rid of loader
  useEffect(()=>{
    const socket =new WebSocket('ws://localhost:8080')
    socket.onopen=()=>{
      console.log('connected')
    }
    setsocket(socket)
    socket.onmessage=(message)=>{
      console.log('Recieved message:',message.data)
      setlatestmessage(message.data )
    }
   return ()=>{
    socket.close()
   }
  },[])

  if(!socket){
  return <div>
     Loading...
    </div>
  }
  return (
    <>
    <input onChange={(e)=>{
      setmessage(e.target.value)
    }}></input>
    <button onClick={()=>{
      socket.send(message)
    }}>Send</button>
    {latestmessage}
    </>
  )
}

export default App
