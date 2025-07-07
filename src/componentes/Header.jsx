import Search from "./Search";
import { useAuth} from "../context/AuthContext";
import { FaUser} from "react-icons/fa";

export default function Header() {
  const { userEmail} = useAuth();

  return (
    <header className="w-full bg-[#355C7D] text-white px-6 py-4 shadow flex flex-col md:flex-row items-center md:justify-between gap-4 md:gap-0 relative z-50">

      {/* Logo + Nombre */}
      <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-4 text-center md:text-left">
        <img
          src="https://res.cloudinary.com/du9ywopnu/image/upload/v1751390958/tv_retro_1_f82gyd.svg"
          alt="Retro TV Logo"
          className="w-16 h-16 md:w-20 md:h-20 mb-2 md:mb-0"
        />
        <div className="flex flex-col justify-center mt-4">
          <h1 className="text-3xl md:text-4xl font-spicy text-[#CBD5E1] tracking-tight leading-none">
            Retro<span className="text-indigo-400">.</span>
          </h1>
          <p className="text-xs text-[#CBD5E1] mt-1 uppercase tracking-widest">
            E-commerce
          </p>
        </div>
      </div>

      {/* Usuario */}
      <div className="flex items-center gap-2 text-sm text-slate-100">
        {userEmail && (
          <>
            <FaUser className="text-indigo-400" />
            <span className="truncate max-w-[150px]">{userEmail}</span>
          </>
)}
      </div>

      {/* Search */}
      <div className="w-full md:w-1/3 flex justify-center md:justify-end">
        <Search />
      </div>
    </header>
);
}
