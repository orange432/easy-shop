import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
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
        <h1 style={{textAlign: 'center'}}>You are logged in!</h1>
        <div style={{textAlign: 'center'}}>
          <Link to="/editor">Item Editor</Link>
        </div>
      </div>
    )
  }

  return(
    <UnauthorizedScreen/>
  )
}

export default Dashboard
