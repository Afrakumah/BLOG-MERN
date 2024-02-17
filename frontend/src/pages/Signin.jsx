import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signinStart, signinSuccess, signinFailure } from "../store/user/userSlice";
import {useDispatch, useSelector} from 'react-redux'
import OAuth from "../components/OAuth.jsx";


export default function Signin() {
  //listening for onchange events as typing
  const [formData, setFormData] = useState({});
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false); using useselector to fetch initial error n loading state from reducer

  const {loading, error: errorMessage} = useSelector(state => state.user);


  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    //prevent default behaviour of browser refreshing when we submit
    e.preventDefault();

    if (!formData.email || !formData.password) {
      // return setErrorMessage("Please fill out all fields");
      return dispatch(signinFailure("All fields are required"));
    }

    try {
      // setLoading(true);  signinstart reducer contains loading and null
      //set error to null bcos maybe there's error for the pre use req and it must be cleared
      // setErrorMessage(null);

dispatch(signinStart());

      //because it's frontend we can add localhost tothe path but instead create a proxy in vite.config file
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      //convert res to json
      const data = await res.json();

      //alert error message when res is false
      if (data.success === false) {
        // return setErrorMessage(data.message);
        dispatch(signinFailure(data.message));
      }

      // setLoading(false);signinFailure will set loading to false
      if (res.ok) {
        dispatch(signinSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signinFailure(error.message));
      // setErrorMessage(error.message);
      // setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 gap-1 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span
              className="px-2 py1 bg-gradient-to-r from-purple-400
        via-red-300 to-pink-400 rounded-lg text-white"
            >
              Angel's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo blog page. You can sign in with your email and
            password
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          
            <div>
              <Label value="Email" />
              <TextInput
                onChange={handleChange}
                type="email"
                placeholder="Enter Email"
                id="email"
              />
            </div>
            <div>
              <Label value="Password" />
              <TextInput
                onChange={handleChange}
                type="password"
                placeholder="**********"
                id="password"
              />
            </div>

            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {/* diable and set spinner so the form can't be submitted several times */}
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            <OAuth />

          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>

          {/* display alert to show error message */}
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
