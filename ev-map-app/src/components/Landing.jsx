import React,{useEffect,useState} from "react"
import { Parallax,ParallaxLayer } from "@react-spring/parallax"
import { useAuth } from "@clerk/clerk-react"
import axios from "axios"
import { motion,useAnimation } from "framer-motion"
import { useInView } from 'react-intersection-observer'
import { useNavigate } from "react-router-dom"
function Landing(){
  const {isSignedIn}=useAuth()
  const control=useAnimation()
  const[ref,inView]=useInView({threshold:0.2})
  const infoSections=[
  {
    title: 'What is Our EV Charging Point?',
    paragraphs: ['Our EV charging point is a fast, reliable, and accessible solution for electric vehicle users.','Whether you\'re commuting or on a road trip, our station delivers high-speed charging compatible with all major EV brands — ensuring you\'re always ready to go.','With a growing network of charging locations, you can confidently plan your trips without range anxiety. Our intuitive interface helps you find nearby stations, view availability, and start charging in seconds.',]
  },
  {
    title: 'Why Choose Our Platform?',
    paragraphs: ['We offer real-time station availability, route-based charger recommendations, and seamless payment options — all in one place.','Our app is designed for convenience, speed, and a user-friendly experience that puts you in control of your EV journey.','From data-driven station insights to 24/7 support, we’re focused on making EV charging effortless for everyone.Lets dive into the world of \electric vehicles']
  },
  {
  title: 'Reliable Support, Anytime, Anywhere',
  paragraphs: ["We're committed to providing 24/7 customer support for any charging-related concerns or questions.","Whether you're on a late-night road trip or exploring a new city, help is just a tap away through our app or hotline.","Our dedicated team monitors station performance and user feedback to ensure a smooth charging experience wherever you are."]
  }
  ]
  useEffect(()=>{
    if(inView) control.start({opacity:1,y:0})
  },[inView])
  return(
    <div className="w-screen min-h-screen overflow-hidden bg-[url('/image.png')] bg-center bg-cover text-white">
      <nav className="backdrop-blur-3xl bg-white/10 border border-white/20 shadow-xl text-white px-10 py-4 rounded-2xl w-full max-w-xl mx-auto flex flex-wrap justify-between items-center gap-4 mt-15">
        <div className="flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-start w-full sm:w-auto">
          {["Home","About","Get Started","Reach Out"].map((label)=>(
            <button key={label}className="px-4 py-2 rounded-xl bg-white/20 border border-white/30 backdrop-blur-md hover:bg-white/30 transition shadow" onClick={()=>{if(label==='About')window.location.href='https://ev-route-finder.vercel.app/#/try';if (label==="Get Started"){if (isSignedIn) {window.location.href = "https://ev-route-finder.vercel.app/#/get";} else {window.location.href ="https://national-dane-76.accounts.dev/sign-in?redirect_url=https://ev-route-finder.vercel.app/#/get";}};if(label==='Reach Out')window.location.href='https://ev-route-finder.vercel.app/#/contact'}}>{label}</button>))}
        </div>
      </nav>
      <Parallax pages={2} className="overflow-y-scroll scrollbar-hidden">
        <ParallaxLayer offset={0} speed={0} className="flex flex-col items-center gap-8 px-4 py-8">
          {infoSections.slice(0,2).map((item,index)=>(
            <motion.div key={index} ref={ref} initial={{ opacity: 100, y: 50 }} animate={control} transition={{ duration: 0.8, delay: index * 0.2 }} className="bg-gradient-to-r from-white via-gray-50 to-white shadow-2xl rounded-3xl w-full max-w-6xl h-fit transition-transform hover:scale-[1.02] hover:shadow-blue-100 flex items-center justify-center p-6 md:p-10">
              <div className="flex flex-col md:flex-row items-start gap-4">
                <div className="bg-blue-100 text-blue-600 rounded-full p-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"/></svg>
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-2">{item.title}</h2>
                  {item.paragraphs.map((text, i) => (
                    <p key={i} className={`text-gray-700 leading-relaxed ${i !== 0 ? 'mt-4' : ''}`}>{text}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0} className="flex flex-col items-center gap-8 px-4 py-8">
          <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={control} transition={{ duration: 0.8, delay: 0.2 }} className="bg-gradient-to-r from-white via-gray-50 to-white shadow-2xl rounded-3xl w-full max-w-6xl h-fit transition-transform hover:scale-[1.02] hover:shadow-blue-100 flex items-center justify-center p-6 md:p-10">
            <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="bg-blue-100 text-blue-600 rounded-full p-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"/></svg>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-2">{infoSections[2].title}</h2>
                {infoSections[2].paragraphs.map((text, i) => (
                  <p key={i} className={`text-gray-700 leading-relaxed ${i !== 0 ? 'mt-4' : ''}`}>{text}</p>
                ))}
              </div>
            </div>
          </motion.div>
        </ParallaxLayer>
      </Parallax>
    </div>
  )
}

export default Landing
