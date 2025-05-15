import { Navigate } from 'react-router-dom'

export default function ProtectedRoutes(props) {
    if(localStorage.getItem('UserToken')!==null){
        return props.children
    }
    else{
        return <Navigate to={'/login'}/>
    }


  }
