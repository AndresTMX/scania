import { supabase } from "../../supabase";

export async function addRegisterTaller() {
    try {
        const { error } = await supabase.from('movimientos_taller')
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

export async function getRegistersForId(id) {
    try {
        const { error, data } = await supabase
            .from('movimientos_taller')
            .select('*, users(*) ')
            .eq('registro_id', id)

        if (error) {
            throw new Error(`Error al obtener registros, error: ${error.message}`)
        }

        return { error, data }
    } catch (error) {
        console.error(error)
    }
}