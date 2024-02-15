import { useState } from "react";
import { supabase } from "../../supabase";

function useChecklist() {

    const [checklist, setChecklist] = useState([])
    const [loading, setLoading] = useState(null)

    /*/AGREGAR NUEVO CHECKLIST DE REVISION /*/
    async function createInputChecklist(dataCheck, infoOutput) {
        try {

            const { tracto_id, tipo } = dataCheck;

            const newStatus = tipo != 'salida' ? 'revisado-entrada' : 'finalizado';

            let updates

            if (tipo === 'entrada') {
                updates = { status: newStatus }
            } else {
                updates = { status: newStatus, ...infoOutput }
            }

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
                .update({ ...updates })
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