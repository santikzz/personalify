import { ReactNode } from "react";
import { cn } from "@/lib/utils";

import Header from "./Header";
import LeftSheet from "./LeftSheet";

interface MainWrapperProps {
    children: ReactNode;
    className?: string;
}

export default function MainWrapper({ children, className }: MainWrapperProps) {
    return (
        <div className="flex h-screen flex-col">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <aside className="hidden w-64 flex-shrink-0 border-r md:block">
                    <LeftSheet />
                </aside>
                <main className={cn("flex-1 overflow-y-auto p-4", className)}>
                    {children}
                </main>
            </div>
        </div>
    )
}