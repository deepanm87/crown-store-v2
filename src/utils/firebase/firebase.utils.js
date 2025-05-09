import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAnb7ffVcXabudyvsNY7SP0qwQQeG9OhQU",
  authDomain: "crown-store-c9050.firebaseapp.com",
  projectId: "crown-store-c9050",
  storageBucket: "crown-store-c9050.firebasestorage.app",
  messagingSenderId: "1001280911073",
  appId: "1:1001280911073:web:08c88f5f4647b7a59be9a0"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {  
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log(`error creating the user: ${error.message}`)
    }
  }

  return userDocRef

}