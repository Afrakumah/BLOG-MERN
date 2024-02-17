import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'


export default function PrivatRoute() {
    const {currentUser} = useSelector((state) => state.user);

  return currentUser ? <Outlet /> : <Navigate to='/sign-in' />
}

//outlet here is the child in the route ie dashboard
//making dashboard private to a logged in user

