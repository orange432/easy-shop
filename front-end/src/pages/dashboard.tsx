import React, { useState, useEffect } from 'react'
import { APICall } from '../util/api';
import LoadingScreen from '../components/loading-screen';
import UnauthorizedScreen from '../components/unauth-screen';

const Dashboard = () => {
  const [isLoading,setIsLoading]= useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [email, setEmail] = useState('');
  
  const authorize = () => {
    const query = `
    query{
      Authorize(session: "${localStorage.getItem('session')}"){
        success
        email
        role
        error
      }
    }
    `
    APICall(query)
    .then(res=>res.json())
    .then(({data})=>{
      if(data.success){
        setEmail(data.Authorize.email)
        setAuthorized(true);
        setIsLoading(false);
      }else{
        window.location.href="/login";
      }
    })
  }

  useEffect(()=>{
    authorize();
  },[])

  if(isLoading){
    return(
      <LoadingScreen/>
    )
  }

  if(authorized){
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
