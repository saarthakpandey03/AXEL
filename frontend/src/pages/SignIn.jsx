import React from 'react'
import AuthLayout from '../components/auth/AuthLayout'
import SignInForm from '../components/auth/SignInForm'

const SignIn = () => {
  return (
    <div>
        <div className="absolute top-12 left-12 z-20 hidden lg:flex lg:flex-col">
  <h1 className="text-5xl font-black tracking-tight text-slate-900">
    AXEL
  </h1>

  <p className="mt-2 text-lg text-slate-500">
    Your AI Workspace
  </p>
</div>
        <AuthLayout
        reverse 
  >
  <SignInForm />
</AuthLayout>
    </div>
  )
}

export default SignIn