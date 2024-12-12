import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { LoaderCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const InputSearch = ({ className, ...props }) => {

    return (
        <div className="relative">
            <Input
                className={cn('peer pe-9 ps-9', className)}
                // placeholder="Buscar..."
                // type="search"
                // value={inputValue}
                // onChange={(e) => setInputValue(e.target.value)}
                {...props}
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <Search size={16} strokeWidth={2} aria-hidden="true" />
            </div>
            <button
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Press to speak"
                type="submit"
            >
                {/* <Mic size={16} strokeWidth={2} aria-hidden="true" /> */}
            </button>
        </div>
    );
}
