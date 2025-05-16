import { createContext, useEffect, useReducer } from "react"
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils"
import { createAction } from "../utils/reducer/reducer.utils"
import { userReducer } from "../store/user/user.reducer"

export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null
})



export const UserProvider = ({ children }) => {
    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE)
    const setCurrentUser = user => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))
    }
    useEffect( () => {
        const unsubscribe = onAuthStateChangedListener( user => {
            if(user) {
                createUserDocumentFromAuth(user)
            }
            setCurrentUser(user)
        })
        return unsubscribe
    }, [])

    return(
        <UserContext.Provider value={{ currentUser }}>
            {children}
        </UserContext.Provider>
    )
}

