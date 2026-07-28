import AuthBranding from "./AuthBranding";

const AuthLayout = ({
  children,
  title,
  description,
  reverse = false,
}) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">

      {/* Background Glow */}

      <div className="absolute -left-40 top-0 h-[650px] w-[650px] rounded-full bg-blue-300/20 blur-[180px]" />

      <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-cyan-300/20 blur-[180px]" />

      {/* Mobile Logo */}

      <div className="absolute top-6 left-6 z-50 lg:hidden">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">AXEL</h1>
        <p className="mt-1 text-sm text-slate-500">Your AI Workspace</p>
      </div>

      <div className="relative grid min-h-screen lg:grid-cols-2">

        {/* Form Section */}

        <div className={`flex items-center justify-center px-6 py-24 lg:px-16 ${reverse ? "order-2" : "order-2 lg:order-1"}`}>
          {children}
        </div>

        {/* Branding Section */}

<div className={`relative overflow-hidden ${reverse ? "order-1" : "order-2"} hidden lg:flex`}>
          <AuthBranding title={title} description={description} />
        </div>

      </div>

    </div>
  );
};

export default AuthLayout;