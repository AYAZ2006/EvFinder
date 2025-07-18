import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import toast from 'react-hot-toast'
function Contact() {
  const[cap,setCap]=useState(null)
  const handle=async(e)=>{
    e.preventDefault()
    const formData=new FormData(e.target)
    formData.append("access_key", "1d1a3854-d4dd-44be-99f7-7c1a810c00cd")
    const object=Object.fromEntries(formData)
    const json=JSON.stringify(object)
    const res=await fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:json}).then((res)=>res.json())
    if(res.success){
      toast.success('Success!')
      e.target.reset()
      setCap(null)
    }
    else{
      toast.error('Oops Something is wrong!')
    }
  }
  return (
    <div className="w-screen min-h-screen overflow-y-auto bg-[url('/image.png')] bg-center bg-cover text-white">
      <div className="flex flex-col md:flex-row bg-opacity-80 rounded-lg shadow-lg mt-10 lg:mt-24 scroll-auto">
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-top">
          <h1 className="text-3xl md:text-4xl font-bold mb-[10px]">Get In Touch.</h1>
          <h6 className="text-base md:text-lg mb-[-40px]">Or just reach out manually to&nbsp;<a href="mailto:hajrasultana7075@gmail.com"className="underline text-white hover:text-gray-200">hajrasultana7075@gmail.com</a>
          <ReCAPTCHA sitekey='6LcVoIYrAAAAAME2woQgpOEb0x9lFMIUD3J_t3L_' onChange={(value)=>setCap(value)} className='lg:mt-20'></ReCAPTCHA>
          </h6>
        </div>
        <form className="w-full md:w-1/2 p-6 gap-5 flex flex-col" onSubmit={handle}>
          <div>
            <h6>Full Name</h6>
            <input name='name' placeholder='Enter your fullname...' className='border-2 rounded-full p-2 lg:w-1/2' required></input>
          </div>
          <div>
            <h6>Email Address</h6>
            <input type='email' name='email' placeholder='Enter your email address...' className='border-2 rounded-full p-2 lg:w-1/2' required></input>
          </div>
          <div>
            <h6>Phone Number</h6>
            <input name='phone' placeholder='Enter your phone number...' className='border-2 rounded-full p-2 lg:w-1/2'required></input>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-white">Message</label>
            <textarea name='message' placeholder="Enter your main text here..." className="w-full border-2 border-white bg-transparent text-white rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-white" rows={3} required/>
          </div>
          <button type='submit' onClick={(e)=>{if(!cap){e.preventDefault();toast.error('Please verify CAPTCHA!')}}}>Submit Form</button>
        </form>
      </div>    
    </div>
  )
}

export default Contact
