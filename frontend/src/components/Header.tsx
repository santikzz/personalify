import { SidebarTrigger } from "./ui/sidebar";
import { InputSearchLoader } from "./InputSearch";

export default function Header() {
    return (
        <header className="w-full h-16 border-b flex flex-row px-4 items-center">
            <div className="flex flex-row items-center gap-4">
                <SidebarTrigger />
                {/* <InputSearchLoader className="w-80" /> */}
            </div>
        </header>
    );
}