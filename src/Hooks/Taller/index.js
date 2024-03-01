import { supabase } from "../../supabase";
import { useState } from "react";
import { toast } from "sonner";

function useTaller() {

    const [registers, setRegisters] = useState([]);
    const [error, setError] = useState(null);

    async function addRegister(newRegister) {
        try {
            const { error } = await supabase.from('movimientos_taller')
                .insert({ ...newRegister })

            if (error) {
                throw new Error(`Error al crear registro de entrada, error: ${error.message}`)
            }

            toast.success(`nueva ${newRegister.tipo} registrada`)
            return { error }
        } catch (error) {
            console.error(error)
            toast.error(`Error al crear movimiento de taller, error: ${error.message}`)
            return { error }
        }
    }

    async function gettAllRegisters() {
        try {
            const { error, data } = await supabase
                .from('movimientos_taller')
                .select(`*, registros(*), users(*)`)

            if (error) {
                throw new Error(`Error al crear registro de entrada, error: ${error.message}`)
            }

            setRegisters(data)
            return { error }
        } catch (error) {
            console.error(error)
            toast.error(`Error al recuperar registros, error: ${error.message}`)
            return { error }
        }
    }

    return { gettAllRegisters, addRegister, registers }

}

export { useTaller };