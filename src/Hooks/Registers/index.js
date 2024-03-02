import { supabase } from "../../supabase";
import { useState } from "react";

function useRegister() {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    async function addRegister(newRegister) {
        try {
            const { error } = await supabase.from('registros')
                .insert({ ...newRegister })

            if (error) {
                throw new Error(`Error al crear registro de entrada, error: ${error.message}`)
            }

            return { error }

        } catch (error) {
            console.error(error)
            return { error }
        }
    }

    async function getAllRegister() {
        try {
            setError(null)
            const { error, data } = await supabase.from('registros')
                .select(`*`)
                .in('status', ['pendiente', 'revisado-entrada'])
                .order('created_at', { ascending: false })

            if (error) {
                throw new Error(`Error al obtener registros de entrada, error: ${error.message}`)
            }

            setData(data)
        } catch (error) {
            console.error(error)
            setError(error)
            return { error }
        }
    }

    async function getRegistersFinalize() {
        try {
            setError(null)
            const { error, data } = await supabase.from('registros')
                .select(`*`)
                .eq('status', 'finalizado')
                .order('created_at', { ascending: false })

            if (error) {
                throw new Error(`Error al obtener registros de salida, error: ${error.message}`)
            }

            setData(data)
        } catch (error) {
            console.error(error)
            setError(error)
            return { error }
        }
    }

    async function gerRegistersTaller() {
        try {
            setError(null)
            const { error, data } = await supabase.from('registros')
                .select(`*, responsivas(*)`)
                .eq('status', 'taller')
                .order('created_at', { ascending: false })

            if (error) {
                throw new Error(`Error al obtener registros de salida, error: ${error.message}`)
            }

            setData(data)
        } catch (error) {
            console.error(error)
            setError(error)
            return { error }
        }
    }


    return { addRegister, getAllRegister, getRegistersFinalize, gerRegistersTaller, data, error }

}

export { useRegister };