import { createContext, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query"
// import { api } from "@/services/Api";


interface GlobalProviderProps {
    children: React.ReactNode;
}

interface GlobalContextType {
    loading: boolean;
    user: any;
    isAuthenticated: boolean;
    isDesktop: boolean;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const GlobalProvider = ({ children }: GlobalProviderProps) => {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const isDesktop = useMediaQuery("(min-width: 768px)")

    // useEffect(() => {
    //     const initalizateAuth = async () => {
    //         const token = localStorage.getItem('token');
    //         if (token) {
    //             login(token);
    //         }
    //     }
    //     initalizateAuth();
    //     setLoading(false);
    // }, [])

    // const login = async (token) => {
    //     localStorage.setItem('token', token);
    //     setIsAuthenticated(true);
    //     api.setAuthToken(token);
    //     try {
    //         const environment = await api.getEnvironmentFull();
    //         setUser(environment.user);
    //         setOwnedJoinedGroups(environment.groups);
    //     } catch (error) {
    //         console.error(error);
    //         localStorage.removeItem('token');
    //         api.setAuthToken(null);
    //         setIsAuthenticated(false);
    //     }
    // }

    // const logout = () => {
    //     setIsAuthenticated(false);
    //     setUser(null);
    //     setOwnedJoinedGroups(null);
    //     api.setAuthToken(null);
    //     localStorage.removeItem('token');
    // }

    if (loading) return <div>loading...</div>;

    return (
        <GlobalContext.Provider value={{
            loading,
            user,
            isAuthenticated,
            isDesktop
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalProvider, GlobalContext };