import { createContext, useState } from 'react'

 export let UserContext=createContext();

 export default function UserContextProvider({children}){
         let [isLogin,SetIsLogin]=useState(null);
          function logout() {
    localStorage.removeItem("User");
    localStorage.removeItem("UserToken")
    SetIsLogin(false);
  }
         return(
            <>
            <UserContext.Provider value={{isLogin,SetIsLogin,logout}}>
                {children}

            </UserContext.Provider>
            </>
         )
 }
