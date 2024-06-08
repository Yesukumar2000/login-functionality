import React from 'react'
import TopNavigation from '../TopNavigation/TopNavigation'
import { useSelector } from 'react-redux'

function Dashboard() {
  let storeObj= useSelector((store)=>{
    return store
  })
  return (
    <div>
        <TopNavigation/>
        <h1>Dashboard</h1>
        <h2>welcome  {storeObj.userDetails.firstName} {storeObj.userDetails.lastName}</h2>
        <img src={`http://localhost:7999/${storeObj.userDetails.profilePic}`} alt={`http://localhost:7999/${storeObj.userDetails.profilePic}`}/>
    </div>
  )
}

export default Dashboard