import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const router = useRouter();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmailError(false);
    setPasswordError(false);
    setUsernameError(false);

    if (!emailRegex.test(email)) {
      setEmailError(true);
      return;
    }
    if (password.length < 8) {
      setPasswordError(true);
      return;
    }
    if (username.trim() === '') {
      setUsernameError(true);
      return;
    }
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/register',
        {
          name: name,
          email: email,
          password: password,
          username: username,
        },
        { withCredentials: true }
      );
      console.log('Registration successful');
      router.push('/auth');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <>
      <div className="h-screen flex bg-gray-900 text-white">
        <style jsx>{`
          .register_img_section {
            background: linear-gradient(rgba(2, 2, 2, 0.7), rgba(0, 0, 0, 0.7)),
              url('/WEBBCCraft.png') center center;
          }
        `}</style>

        <div className="hidden lg:flex w-full lg:w-1/2 register_img_section justify-around items-center">
          <div className="bg-black opacity-20 inset-0 z-0"></div>
          <div className="w-full mx-auto px-20 flex flex-col items-center space-y-6">
            <h1 className="text-white font-bold text-4xl font-sans">
              Welcome to Your Web Crafter
            </h1>
            <p className="text-white mt-1">Create Your Account</p>
            <div className="flex justify-center lg:justify-start mt-6"></div>
          </div>
        </div>
        <div className="flex w-full lg:w-1/2 justify-center items-center bg-gray-900 space-y-8">
          <div className="w-full px-8 md:px-32 lg:px-24">
            <form
              className="bg-gray-900 rounded-md shadow-2xl p-5"
              onSubmit={handleSubmit}
            >
              <h1 className="font-bold text-2xl mb-1">Sign Up</h1>
              <p className="text-gray-300 mb-8">Create your account</p>
              <div className="flex items-center border-2 mb-2 py-2 px-3 rounded-2xl bg-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  alt="Username Icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                </svg>
                <input
                  id="username"
                  className={`pl-2 w-full outline-none border-none bg-gray-800 text-white ${
                    usernameError ? 'border-red-500' : ''
                  }`}
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setUsernameError(false); // Reset error when user changes input
                  }}
                />
              </div>
              {usernameError && (
                <span className="text-red-500 text-xs">
                  Please enter a username
                </span>
              )}

              <div className="flex items-center border-2 mb-2 py-2 px-3 rounded-2xl bg-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  alt="Email Icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  id="email"
                  className={`pl-2 w-full outline-none border-none bg-gray-800 text-white ${
                    emailError ? 'border-red-500' : ''
                  }`}
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(false); // Reset error when user changes input
                  }}
                />
              </div>
              {emailError && (
                <span className="text-red-500 text-xs">
                  Please enter a valid email address
                </span>
              )}

              <div className="flex items-center border-2 mb-2 py-2 px-3 rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  alt="Password Icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  className={`pl-2 w-full outline-none border-none bg-gray-800 text-white ${
                    passwordError ? 'border-red-500' : ''
                  }`}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password (min. 8 characters)"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(false); // Reset error when user changes input
                  }}
                />
              </div>
              {passwordError && (
                <span className="text-red-500 text-xs ">
                  Password must be at least 8 characters long
                </span>
              )}

              <button
                type="submit"
                className="relative m-5 inline-flex h-12 w-full overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  Register
                </span>
              </button>
              <div className="flex justify-between mt-4">
                <Link href="/auth/login">
                  <button className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">
                    Already have an account? Login here
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
