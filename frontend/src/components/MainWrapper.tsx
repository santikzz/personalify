import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";

interface MainWrapperProps {
    children: ReactNode;
    className?: string;
}

export default function MainWrapper({ children, className }: MainWrapperProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <SidebarProvider>
                <AppSidebar />
                <main className={cn("flex-1", className)}>
                    <Header />
                    <div className="p-4">
                        {children}
                    </div>
                </main>
            </SidebarProvider>
        </div>
    );
}
