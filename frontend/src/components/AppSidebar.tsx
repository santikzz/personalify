import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from "@/components/ui/sidebar"
import { Building2, ChevronUp, Home, LogOut, User2, Users } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext } from "@/context/GlobalContext";
import { logo_full_white, squad_icon_256 } from "@/Assets";
import { DropdownMenu } from "./ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const navItems = [
    {
        icon: Home,
        label: "Inicio",
        to: "/"
    },
    {
        icon: Users,
        label: "Personal",
        to: "/personal"
    },
    {
        icon: Building2,
        label: "Clientes",
        to: "/clients"
    },
]

export const AppSidebar = () => {

    const { clearSession, user } = useGlobalContext();
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="dark">
            <Sidebar>
                <SidebarHeader className="px-4 pt-5">
                    <div className="flex flex-row items-center gap-2">
                        <img src={logo_full_white} className="w-full" />
                    </div>
                </SidebarHeader>

                <SidebarContent className="mt-2 p-2">
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {navItems.map((item) => (
                                    <SidebarMenuItem key={item.label}>
                                        <SidebarMenuButton asChild isActive={
                                            item.to === "/" ? location.pathname === "/" :
                                                location.pathname.startsWith(item.to)
                                        }>
                                            <button onClick={() => { navigate(item.to) }}>
                                                <item.icon />
                                                <span className="text-base">{item.label}</span>
                                            </button>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter className="p-3">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton>
                                        <User2 />{user?.name}
                                        <ChevronUp className="ml-auto" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    side="top"
                                    className="w-[--radix-popper-anchor-width] dark"
                                >
                                    <DropdownMenuItem>
                                        <button onClick={clearSession} className="flex flex-row items-center gap-1">
                                            <LogOut size={16} />
                                            <span className="text-base">Cerrar sesion</span>
                                        </button>
                                    </DropdownMenuItem>

                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>


            </Sidebar >
        </div>
    );
}