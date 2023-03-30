import React, { useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
function UpdateProduct() {
const [name,setName]=React.useState("")
const [price,setPrice]=React.useState("")
const [category,setCategory]=React.useState("")
const [company,setCompany]=React.useState("")
const params=useParams()
const navigate=useNavigate()

useEffect(()=>{
    getProductDetails()
},[])

const getProductDetails=async ()=>{
let result=await fetch(`http://localhost:4000/product/${params.id}`)
result=await result.json()
console.warn(result)
setName(result.name)
setPrice(result.price)
setCategory(result.category)
setCompany(result.company)
}
const updateProduct= async ()=>{
  let result=await fetch(`http://localhost:4000/product/${params.id}`,{
    method:"Put",
    body:JSON.stringify({name,price,category,company}),
    headers:{
        "Content-Type":"Application/json"
    }
  })
  result=await result.json()
  if(result){
    navigate("/")
  }
  
}

  return (
    <div className='product'>
        <h1>UpdateProduct</h1>
      <input type="text" placeholder='Enter product name' className='inputbox'  value={name} onChange={(e)=>{setName(e.target.value)}} />
      {/* {error && !name &&<span className='invalid-input'>Enter valid name</span>} */}
      <input type="text" placeholder='Enter product price' className='inputbox' value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
      {/* {error && !price &&<span className='invalid-input'>Enter valid Price</span>} */}
      <input type="text" placeholder='Enter product category' className='inputbox' value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
      {/* {error && !category&&<span className='invalid-input'>Enter valid category</span>} */}
      <input type="text" placeholder='Enter product company' className='inputbox'  value={company} onChange={(e)=>{setCompany(e.target.value)}}/>
      {/* {error && !company &&<span className='invalid-input'>Enter valid Company name</span>} */}
      <button onClick={updateProduct} className='appButton'>Update Product</button>
    </div>

  )
}

export default UpdateProduct