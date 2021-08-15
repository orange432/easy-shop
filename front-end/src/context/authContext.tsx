import React, {useContext, useState, createContext} from "react";
import { APICall } from "../util/api";

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider: React.FC = ({children}) => {
  const [isAuthorized, setIsAuthorized ] = useState(false)
  const [email,setEmail] = useState('');
  
  const authorize = () => {
    
    return new Promise((resolve,reject)=>{
      const token = localStorage.getItem('session')
      const query = `
        query{
          Authorize(session: "${token}"){
            success
            email
            error
          }
        }
      `
      APICall(query)
      .then((res: any)=>{
        let {data} = res;
        if(data.Authorize.success===true){
          console.log('AUTHORIZED!')
          setEmail(data.Authorize.email)
          setIsAuthorized(true);
          resolve({authorized: true, email :data.Authorize.email})
        }else{
          resolve({authorized: false, error: data.Authorize.error})
          window.location.href = '/login';
        }
      })
      .catch(err=>{
        resolve({authorized: false, error: "There was an error connecting to the API, please try again."})
      })
    })
    
  }

  const ctxValue = {
    isAuthorized,
    authorize
  }
  return(
    <AuthContext.Provider value={ctxValue}>
      {children}
    </AuthContext.Provider>
  )
}