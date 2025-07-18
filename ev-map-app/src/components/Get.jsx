import React,{useEffect,useState} from "react"
import {MapContainer,TileLayer,Marker,Popup} from "react-leaflet"
import axios from "axios"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const userIcon=new L.Icon({iconUrl:"https://cdn-icons-png.flaticon.com/128/149/149071.png",iconSize:[32,32],iconAnchor:[16,32],popupAnchor:[0,-32]})
const stationIcon=new L.Icon({iconUrl:"https://cdn-icons-png.flaticon.com/128/684/684908.png",iconSize:[32,32],iconAnchor:[16,32],popupAnchor:[0,-32]})
function Get(){
  const[location,setLocation]=useState(null)
  const[stations,setStations]=useState([])
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(
      async(pos)=>{
        const{latitude,longitude}=pos.coords
        setLocation({lat:latitude,lon:longitude})
        try{
          const res=await axios.get(`https://api.tomtom.com/search/2/nearbySearch/.json?lat=${latitude}&lon=${longitude}&categorySet=7309&key=Bi3W48sxr77pmKuHzk2DGVqNI7M9lyJP`)
          const places=res.data.results.map(r=>({lat:r.position.lat,lon:r.position.lon,name:r.poi.name,address:r.address.freeformAddress}))
          setStations(places)
        }catch(err){
          console.error("Failed to fetch stations",err)
        }
      },
      err=>{
        alert("Geolocation failed or denied")
        console.error(err)
      }
    )
  },[])

  return(
    <div style={{height:"100vh",width:"100vw"}}>
      {location?(
        <MapContainer center={[location.lat,location.lon]} zoom={13} style={{height:"100%",width:"100%"}}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'/>
          <Marker position={[location.lat,location.lon]} icon={userIcon}><Popup>You are here</Popup></Marker>
          {stations.map((station,idx)=>(
            <Marker key={idx} position={[station.lat,station.lon]} icon={stationIcon}>
              <Popup><strong>{station.name||"EV Charger"}</strong><br/>{station.address}</Popup>
            </Marker>
          ))}
        </MapContainer>
      ):(
        <p style={{textAlign:"center",marginTop:"2rem"}}>Getting your location...</p>
      )}
    </div>
  )
}

export default Get
