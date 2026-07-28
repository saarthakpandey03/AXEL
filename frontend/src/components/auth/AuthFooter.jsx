import { Link } from "react-router-dom";

const AuthFooter = () => {
  return (
    <p className="mt-10 text-center text-sm leading-6 text-slate-400">

      By continuing, you agree to AXEL's{" "}

      <Link
        to="/terms"
        className="font-medium text-slate-600 transition hover:text-blue-600"
      >
        Terms of Service
      </Link>

      {" "}and{" "}

      <Link
        to="/privacy"
        className="font-medium text-slate-600 transition hover:text-blue-600"
      >
        Privacy Policy
      </Link>

    </p>
  );
};

export default AuthFooter;