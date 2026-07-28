import React from 'react'
import AuthLayout from '../components/auth/AuthLayout'
import SignUpForm from '../components/auth/SignUpForm'

const SignUp = () => {
  return (
    <div>
        <div className="absolute top-4 left-10 z-20">

        <h1 className="text-5xl font-black tracking-tight text-slate-900">
          AXEL
        </h1>

        <p className="mt-2 text-lg text-slate-500">
          Your AI Workspace
        </p>

      </div>
        <AuthLayout>
  <SignUpForm />
</AuthLayout>
    </div>
  )
}

export default SignUp