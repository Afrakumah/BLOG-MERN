import { Button } from 'flowbite-react'
import React from 'react'
import {AiFillGoogleCircle} from 'react-icons/ai'
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import { app } from '../firebase'
import { signinSuccess } from '../store/user/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'



export default function OAuth() {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider()
        //to always ask you to select the account when u choose continue with google
        provider.setCustomParameters({prompt: 'select_account'})
        //try catch to open popup window

        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            //console.log(resultsFromGoogle) sending data to the backend to fetch body
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL
                })
            })
            const data = await res.json()
            if(res.ok) {
                dispatch(signinSuccess(data))
                navigate('/')
            }
        } catch (error) {
           console.log(error) 
        }
    }
  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline  onClick={handleGoogleClick}>
        <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
        Continue with Google
    </Button>
  )
}
