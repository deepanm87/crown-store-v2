import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

const Signin = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup()
        const userDocRef = await createUserDocumentFromAuth(user)
        createUserDocumentFromAuth(user)
    }
    return(
        <>
            <button onClick={logGoogleUser}>Sign in with Google</button>
        </>
    )
}

export default Signin
