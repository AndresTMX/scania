import { supabase } from "../../supabase";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { createContext, useEffect } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {

    const navigate = useNavigate();

    async function login(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) {
                throw new Error(`Error de inicio de session: ${error.message}`)
            }
            sessionStorage.setItem('scania-session', JSON.stringify(data))
            navigate('/')
        } catch (error) {
            console.error(error)
            toast.error(error.message)

        }
    };

    async function logOut() {
        try {
            const { error } = await supabase.auth.signOut();

            if (error) {
                throw new Error(`Error al cerrar sesion: ${error.message}`)
            }

            navigate('/login')
            sessionStorage.clear('scania-session')
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    };

    useEffect(() => {
        const { data } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session == null) {
                    navigate('/login', { replace: true });
                } else {
                    children
                }
            }
        );

        return () => {
            data?.subscription?.unsubscribe();
        };
    }, [children, navigate]);

    return (
        <>
            <AuthContext.Provider value={{ login, logOut }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export { AuthProvider, AuthContext };