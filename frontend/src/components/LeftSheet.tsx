import { useGlobalContext } from "@/context/GlobalContext";
import { Building2, Home, LogOut, Users } from "lucide-react"
import { useNavigate } from "react-router-dom";

export default function LeftSheet() {

    const { clearSession } = useGlobalContext();
    const navigate = useNavigate();

    const navItems = [
        { icon: Home, label: "Inicio", to: "/" },
        { icon: Users, label: "Personal", to: "/personal" },
        { icon: Building2, label: "Clientes", to: "/clients" },
    ]

    return (
        <div className="flex h-full flex-col justify-between pt-10 md:py-6 md:px-4">
            <nav className="space-y-8 md:space-y-4">
                {navItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => { navigate(item.to) }}
                        className={`inline-flex items-center gap-2.5 whitespace-nowrap w-full flex-row flex-nowrap justify-start text-lg px-3 py-2 rounded-lg hover:opacity-75`}
                    >
                        <item.icon size={24} />{item.label}
                    </button>
                ))}
                <button 
                className="flex flex-row items-center px-4 pt-8"
                onClick={clearSession}><LogOut />Logout</button>
            </nav>
        </div>
    );
};