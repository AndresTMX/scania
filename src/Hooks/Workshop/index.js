import { supabase } from "../../supabase";
import { useState } from "react";

function useWorkshops() {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    async function addTracto() {
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



}

export { useWorkshops };