import { useState, useEffect } from 'react'
import './App.css'
import RemoteButton from "./RemoteButton"
import StatusLight from './StatusLight';
function App() {
  const [buttonDown, setButtonDown] = useState(null);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchButton()
  }, [])
  const fetchButton = async () => {
		const url = "http://" + import.meta.env.VITE_SERVER_IP + ":" + import.meta.env.VITE_SERVER_PORT + "/button_state";
    const res = await fetch(url);
    const data = await res.json();
    setButtonDown(data.state)
    setLoading(false)
  }

  if (loading) {
    return <h1>Loading...</h1>
  }
  return (
    <>
      <div className='remoteCase'>
        <StatusLight buttonDown={buttonDown}/>
        <RemoteButton buttonDown={buttonDown} setButtonDown={setButtonDown} />
        <hr style={{'borderTop': '2px solid #2a2a2a', 'marginTop': '80px', 'height': '2px'}} />
        <h2 style={{'fontFamily': 'sans-serif', 'color': '#3b3b3b'}}>MULTI &middot; PI &middot; MOTE</h2>
      </div>
    </>
  )
}

export default App
