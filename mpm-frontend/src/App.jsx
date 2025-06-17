import { useState, useEffect } from 'react'
import './App.css'
import RemoteButton from "./RemoteButton"
import StatusLight from './StatusLight';
function App() {
  const [buttonDown, setButtonDown] = useState(null);
  const [loading, setLoading] = useState(true);
  const [metadata, setMetadata] = useState([])
  useEffect(() => {
    fetchButton()
  }, [])
  useEffect(() => {
    fetchMetadata()
  }, [buttonDown])
  const fetchButton = async () => {
		const url = "https://" + import.meta.env.VITE_SERVER_IP +  "/api/button_state";
    const res = await fetch(url);
    const data = await res.json();
    setButtonDown(data.state)
    setLoading(false)
  }

  const fetchMetadata = async () => {
		const url = "https://" + import.meta.env.VITE_SERVER_IP + "/api/metadata";
    const res = await fetch(url);
    let data = await res.json();
    data = Object.entries(data)
    data.map(d => {
      const date = new Date(d[0])
      d[0] = date
    })
    setMetadata(data)
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
      <div>
        {metadata.map(data => (
          <div key={data[0].getTime()}>
            <p>{data[1]} pressed at {data[0].toLocaleTimeString()} {data[0].toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
