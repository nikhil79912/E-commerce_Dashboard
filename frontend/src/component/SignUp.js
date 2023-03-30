import React,{useEffect, useState} from 'react'          
import {useNavigate} from "react-router-dom"             
function SignUp() {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=React.useState(false)
  const navigate=useNavigate()
  useEffect(()=>{
    const auth=localStorage.getItem("user")
    if(auth){
      navigate("/")
    }
  },[])


  const collectData= async ()=>{
    if(!name||!email||!password){
      setError(true)
      return false
    }
    // console.warn(name,email,password)
    let result=await fetch("http://localhost:4000/register",{
      method:"post",
      body:JSON.stringify({name,email,password}),
      headers:{
        "Content-Type":"application/json"
      }
    })
    result=await result.json()
    console.warn(result)
    localStorage.setItem("user",JSON.stringify(result))
    navigate("/")
  } 
  return (
    <div className='register'>
      <h1>Register</h1>
      <input className='inputbox' type="text" placeholder=
      "Enter Name" value={name} onChange={(e)=>setName(e.target.value)}/>
       {error && !name &&<span className='invalid-input'>Enter valid name</span>}
       <input className='inputbox' type="text" placeholder=
      "Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
       {error && !email &&<span className='invalid-input'>Enter valid email</span>}
       <input className='inputbox' type="password" placeholder=
      "Enter password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
       {error && !password &&<span className='invalid-input'>Enter valid password</span>}
      <button onClick={collectData} className='appButton' type='button'>SignUp</button>
    </div>
  )
}

export default SignUp