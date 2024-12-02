import { Search, X } from "lucide-react"
export default function SearchInput() {
    return (
        <div className="flex flex-row items-center space-x-2 bg-neutral-200 dark:bg-neutral-900 p-2 rounded-full flex-1">
            <Search size={24} className="text-neutral-400 dark:text-neutral-500" />
            <input
                type="text"
                placeholder="Buscar empleado..."
                className="bg-transparent border-none outline-none flex-1 md:w-80 text-black dark:text-white"
            />
            <button className="md:hidden"><X size={24} className="text-neutral-400 dark:text-neutral-500 pr-2" /></button>
        </div>
    );
};