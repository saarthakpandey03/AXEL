import { FaGoogle, FaGithub } from "react-icons/fa";

const SocialLogin = ({
  onGoogle,
  onGithub,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">

      <button
  type="button"
  onClick={onGoogle}
  className="group flex h-14 w-105 items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg"
>
  <FaGoogle className="text-xl text-red-500 transition-transform duration-300 group-hover:scale-110" />

  <span>Continue with Google</span>

</button>

    </div>
  );
};

export default SocialLogin;