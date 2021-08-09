import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/authContext';
import LoadingScreen from '../components/loading-screen';
import UnauthorizedScreen from '../components/unauth-screen';

const Dashboard = () => {
  const [isLoading,setIsLoading]= useState(true);
  
  const auth: any = useAuth();

 
  useEffect(()=>{
    auth.authorize()
    .then((data: any)=>{
      setIsLoading(false);
    })
  },[])

  if(isLoading){
    return(
      <LoadingScreen/>
    )
  }

  if(auth.isAuthorized){
    return (
      <div>
        <h1>You are logged in!</h1>
      </div>
    )
  }

  return(
    <UnauthorizedScreen/>
  )
}

export default Dashboard
