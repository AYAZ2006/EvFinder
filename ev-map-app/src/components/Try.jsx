import React,{Suspense,useRef,useEffect} from "react"
import {Canvas,useFrame} from "@react-three/fiber"
import {OrbitControls,useGLTF} from "@react-three/drei"
function Car({scroll}){
  const{scene}=useGLTF("/car.glb")
  const carRef=useRef()
  useFrame(()=>{
    if (!carRef.current) return
    const scrollY=Math.min(scroll.current,0.5)
    const maxRotation=Math.PI/2
    carRef.current.rotation.y=scrollY*maxRotation
  })
  return(<primitive ref={carRef} object={scene} scale={1.5} position={[0.3,-0.2,0]}/>)
}
function Charger({scroll}){
  const{scene}=useGLTF("/base.glb")
  const chargerRef=useRef()
  useFrame(()=>{
    if (!chargerRef.current) return
    const start=0.3
    const end=0.6
    const progress=Math.min(Math.max((scroll.current-start)/(end-start),0),1)
    chargerRef.current.position.y=-1+progress*1.2
    chargerRef.current.rotation.y=progress*(Math.PI/4)
  })
  return (<primitive ref={chargerRef} object={scene} scale={0.5} position={[0.3, -1, -2]}/>)
}
export default function Try(){
  const scrollRef=useRef(0)
  const containerRef=useRef()
  const handleScroll=()=>{
  const el=containerRef.current
  if(el){
      scrollRef.current=el.scrollTop/(el.scrollHeight-el.clientHeight)
    }
  }
  useEffect(()=>{
    const container=containerRef.current
    container.addEventListener("scroll",handleScroll)
    return()=>container.removeEventListener("scroll",handleScroll)
  },[])
  return (
    <div ref={containerRef} className="w-screen h-screen overflow-y-scroll scrollbar-hidden bg-gray-200">
      <div className="h-[300vh] bg-gray-200">
        <div className="w-screen h-screen sticky top-0">
          <Canvas camera={{position:[-1,2,-3],fov:40}}>
            <ambientLight intensity={10} />
            <directionalLight position={[10,10,10]} intensity={10}/>
            <Suspense fallback={null}>
              <Car scroll={scrollRef}/>
              <Charger scroll={scrollRef}/>
            </Suspense>
            <OrbitControls enableZoom={false}/>
          </Canvas>
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 px-4 py-8">
        <div className="bg-gradient-to-r from-white via-gray-50 to-white shadow-2xl rounded-3xl w-full max-w-6xl h-fit transition-transform hover:scale-[1.02] hover:shadow-blue-100 flex flex-col items-center justify-center p-6 md:p-10">
          <h2 className="text-3xl font-bold text-blue-800 mb-2">Why charge with Us?</h2>
          <ul className="list-disc list-inside text-gray-800 space-y-2">
            <li>Fast charging with up to 150kW output</li>
            <li>Convenient location with 24/7 access</li>
            <li>Secure & monitored station</li>
            <li>Real-time availability via app</li>
            <li>Powered by renewable energy</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 px-4 py-8">
        <div className="bg-gradient-to-r from-white via-gray-50 to-white shadow-2xl rounded-3xl w-full max-w-6xl h-fit transition-transform hover:scale-[1.02] hover:shadow-blue-100 flex flex-col items-center justify-center p-6 md:p-10">
          <h2 className="text-3xl font-bold text-blue-800 mb-2">Our EV journey</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li><strong>Smart Route Planner:</strong> Get optimal paths with charging stops built-in.</li>
            <li><strong>Live Charging Info:</strong> Know charger availability and ETA updates in real-time.</li>
            <li><strong>Traffic Integration:</strong> Avoid delays with dynamic rerouting using live data.</li>
            <li><strong>Fully Responsive:</strong> Works across devices — from your phone to your car screen.</li>
          </ul>
        </div>  
      </div>
      </div>
  );
}
