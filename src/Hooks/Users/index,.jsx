import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { toast } from "sonner";

function useUsers(rol) {

    const [dataUsers, setDataUsers] = useState([]);

    async function getUsers() {
        try {
            const { error, data } = await supabase
                .from('users')
                .select('*')
                .eq('rol', rol)

            if (error) {
                chargueCache();
                throw new Error(`Error al cargar usuarios`);
            }

            localStorage.setItem(`infoUsers_${rol}`, JSON.stringify(data))
            setDataUsers(data)
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    function chargueCache() {
        try {
            const cache = localStorage.getItem(`infoUsers_${rol}`);

            if (cache != null) {
                setDataUsers(JSON.parse(cache))
            }

        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (rol != null && typeof rol === 'string') {
            getUsers()
        } else {
            toast.warning('rol no esta definido')
        }
    }, [rol])

    return { dataUsers }

}

export { useUsers };