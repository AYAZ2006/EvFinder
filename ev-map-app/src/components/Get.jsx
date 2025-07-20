import React,{useEffect,useState,useRef} from "react"
import {MapContainer,TileLayer,Marker,Popup,Polyline,useMap} from "react-leaflet"
import axios from "axios"
import L, { polyline } from "leaflet"
import "leaflet/dist/leaflet.css"
const userIcon=new L.Icon({iconUrl:"https://cdn-icons-png.flaticon.com/128/149/149071.png",iconSize:[32,32],iconAnchor:[16,32],popupAnchor:[0,-32]})
const stationIcon=new L.Icon({iconUrl:"https://cdn-icons-png.flaticon.com/128/684/684908.png",iconSize:[32,32],iconAnchor:[16,32],popupAnchor:[0,-32]})
function Get(){
  const[loc,setLocation]=useState(null)
  const[stations,setStations]=useState([])
  const[route,setRoute]=useState(null)
  const mapRef=useRef(null)
  const[show,setShow]=useState(false)
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
  const getRoute=async(lat,lon)=>{
    if (!loc) return
    try{
      const res=await axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${loc.lat},${loc.lon}:${lat},${lon}/json?key=Bi3W48sxr77pmKuHzk2DGVqNI7M9lyJP&traffic=true&instructionsType=tagged`)
      const routeData=res.data.routes[0]
      const points=routeData.legs[0].points.map((p)=>[p.latitude,p.longitude])
      const instructions=routeData.guidance.instructions
      setRoute({points,delay: routeData.summary.trafficDelayInSeconds,length: routeData.summary.lengthInMeters,travelTime: routeData.summary.travelTimeInSeconds,noTrafficTime: routeData.summary.noTrafficTravelTimeInSeconds,instructions})
      setShow(true)
    } catch (err) {
      alert("Failed to fetch route")
    }
  }
  function FitBoundsOnRoute({points}){
    const map=useMap()
    useEffect(()=>{
      if(points&&points.length>0){
        const bounds=L.latLngBounds(points)
        map.fitBounds(bounds, {paddingTopLeft:[0,200],paddingBottomRight:[100,100],maxZoom:30})
      }
    },[points,map])
    return null
  }
  return(
    <div ref={mapRef} style={{height:"100vh",width:"100vw"}} className="flex h-screen w-screen flex-col lg:flex-row">
      {loc?(
        <div className={`transition-all duration-300 ${show?"w-full lg:w-[80%]":"w-full"} h-[500vh] lg:h-full`}>
          <MapContainer center={[loc.lat,loc.lon]} zoom={13} style={{height:"100%",width:"100%"}}>{route && <FitBoundsOnRoute points={route.points}/>}
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'/>
            <Marker position={[loc.lat,loc.lon]} icon={userIcon}><Popup>You are here</Popup></Marker>
            {stations.map((station,idx)=>(
              <Marker key={idx} position={[station.lat,station.lon]} icon={stationIcon} eventHandlers={{click:()=>getRoute(station.lat,station.lon)}}>
                <Popup><strong>{station.name||"EV Charger"}</strong><br/>{station.address}<br/><em>Click to route</em></Popup>
              </Marker>
            ))}
            {route && <Polyline positions={route.points} color={route.delay>300?"red":route.delay>60?"orange":"green"} weight={4}></Polyline>}
          </MapContainer>
        </div>
      ):(
        <p style={{textAlign:"center",marginTop:"2rem"}}>Getting your location...</p>
      )}
      {route && <>
        <div className="lg:w-[20%] flex flex-col h-full p-6 text-white text-sm leading-relaxed shadow-lg overflow-y-auto">
          <button onClick={()=>window.location.reload()}>Exit Navigation</button>
          <div className="p-5 h-screen">
            <strong className="text-lg">Route Summary</strong><br />
            <p>Distance:{(route.length/1000).toFixed(1)} km<br/>Travel Time (w/traffic):{Math.round(route.travelTime/60)} min<br/>Travel Time (no traffic):{Math.round(route.noTrafficTime/60)} min<br/>Traffic Delay: {Math.round(route.delay / 60)} min</p>
            <ul className="list-disc ml-4 py-2 space-y-2">
              {route.instructions?.map((i, index) => {
                const message=i.message.replace(/<street>(.*?)<\/street>/g, (_, name) => `<strong>${name}</strong>`)
                return <li key={index} dangerouslySetInnerHTML={{__html:`In <strong>${Math.round((i.routeOffsetInMeters/1000)*100)/100} km</strong>,${message}`}}></li>
              })}
            </ul>
          </div>
        </div>
      </>
      }
    </div>
  )
}

export default Get
