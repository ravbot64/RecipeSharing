import { createContext, useState } from "react";
const AuthContext = createContext();

function AuthContextProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);
    const [fetchedRecipes, setFetchedRecipes] = useState([]);
  
    return <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, userId, setUserId,userName, setUserName,fetchedRecipes, setFetchedRecipes}}>
        {children}
    </AuthContext.Provider>
}
export default AuthContext;
export {AuthContextProvider};