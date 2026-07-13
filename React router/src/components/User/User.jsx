import React from 'react'
import { useParams } from 'react-router-dom'

function User() {

    const {id } = useParams()
  return (
    <div className='flex justify-center align-item-center w-full px-10 py-4 bg-emerald-400 rounded-4xl mb-5 mt-5'>User: {id} </div>
  )
}

export default User