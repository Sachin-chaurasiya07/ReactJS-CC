import React, { useState } from 'react'
import { useEffect } from 'react'

function Github() {
  const[data , setData] = useState([])
  useEffect(()=>{
    fetch('https://api.gihtub.com/users/hiteshchoudhary')
    .then(response => response.json)
    .then(data => {
      console.log(data);
      setData(data)
    })

  },[])
  return (
    <div className='flex justify-center align-item-center bg-purple-950 text-white rounded-4xl p-5 mb-5 mt-5 mr-5 ml-5'>Github Followers : {data.followers} </div>
  )
}

export default Github