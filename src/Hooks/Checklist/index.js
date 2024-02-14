import { supabase } from "../../supabase";
import { useState } from "react";

function useChecklist() {

    const [checklist, setChecklist] = useState([])
    const [loading, setLoading] = useState(null)
 
    /*/AGREGAR NUEVO CHECKLIST DE REVISION DE ENTRADA /*/
    async function createInputChecklist(dataCheck) {
        try {

            const { tracto_id } = dataCheck;

            //subir el checklist de entrada
            const { error } = await supabase
                .from('checklist')
                .insert(dataCheck)

            if (error) {
                throw new Error(`Error al subir checklist de entrada, error: ${error.message}`)
            }

            //actualizar el estatus del tracto
            const { error: errorUpdadeStatus } = await supabase
                .from('registros')
                .update({ status: 'revisado-entrada' })
                .eq('id', tracto_id)

            if (errorUpdadeStatus) {
                throw new Error(`Error al actualizar status del registro de entrada, error: ${errorUpdadeStatus.message}`)
            }

            return { error, errorUpdadeStatus }

        } catch (error) {
            console.error(error)
            return { error }
        }
    }

    async function getOneInputChecklist(id) {
        try {
            setLoading(true)
            const { error, data } = await supabase
                .from('checklist')
                .select('*, registros(*)')
                .eq('tracto_id', id)
                .eq('tipo', 'entrada');

            if (error) {
                throw new Error(`Error al recuperar el checklist, error: ${error.message}`)
            }

            setChecklist(data[0])
            setLoading(null)
            return { error }
        } catch (error) {
            console.error(error)
            return { error }
        }
    }

    return { createInputChecklist, getOneInputChecklist, checklist, loading }

}

export { useChecklist };