import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  //listening for onchange events as typing
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    //prevent default behaviour of browser refreshing when we submit
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields");
    }

    try {
      setLoading(true);
      //set error to null bcos maybe there's error for the pre use req and it must be cleared
      setErrorMessage(null);

      //because it's frontend we can add localhost tothe path instead create a proxy in vite.config file
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      //convert res to json
      const data = await res.json();

      //alert error message when res is false
      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
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
            This is a demo blog page. You can sign up with your email and
            password
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Username" />
              <TextInput
                onChange={handleChange}
                type="text"
                placeholder="Enter Username"
                id="username"
              />
            </div>
            <div>
              <Label value="Your Email" />
              <TextInput
                onChange={handleChange}
                type="email"
                placeholder="Enter Email"
                id="email"
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                onChange={handleChange}
                type="password"
                placeholder="Enter Password"
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
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Already have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
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
