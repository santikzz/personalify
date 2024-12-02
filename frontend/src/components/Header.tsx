
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { squad_icon_256 } from "@/Assets";
import SearchInput from "@/components/SearchInput";

export default function Header() {
    return (
        <header className="flex items-center justify-between md:justify-between border-b px-4 py-3">
            <div className="flex flex-row items-center space-x-4 md:space-x-0">
                <Link to="/" className="flex flex-row items-center space-x-2 hover:brightness-75 transition-all duration-100">
                    <img src={squad_icon_256} className="h-10" alt="SQUAD" />
                    <span className="hidden md:flex">
                        <h2 className="font-extrabold text-4xl">PERSONALIFY</h2>
                    </span>
                </Link>
            </div>
            <div className="items-center space-x-2 hidden md:flex">
                {/* <SearchInput /> */}
            </div>
            <div className="flex flex-row items-center space-x-6">
                <div className="items-center space-x-2 hidden md:flex">
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}