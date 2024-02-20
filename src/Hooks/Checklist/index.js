import { useState } from "react";
import { supabase } from "../../supabase";

function useChecklist() {

    const [checklist, setChecklist] = useState([])
    const [loading, setLoading] = useState(null)

    /*/AGREGAR NUEVO CHECKLIST DE REVISION /*/
    async function createInputChecklist(checklist) {
        try {

            const { tracto_id } = checklist;

            //subir el checklist de entrada
            const { error } = await supabase
                .from('checklist')
                .insert(checklist)

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

            return { error }

        } catch (error) {
            console.error(error)
            return { error }
        }
    }

    async function updateOutputChecklist(checklist, dataOutput) {
        try {

            const { tracto_id, document: outputDocument } = checklist;
            const { ot_salida, user_salida_id, destino, checkOut } = dataOutput;

            const { error, data: oldChecklist } = await supabase
                .from(`checklist`)
                .select(`*`)
                .eq('tipo', 'scania')
                .eq('tracto_id', tracto_id)

            if (error) {
                throw new Error(`Error al recuperar checklist de entrada, error: ${error.message} `)
            }

            const copyChecklist = oldChecklist[0].document;

            const newChecklist = {}

            for (const key of Object.keys(copyChecklist)) {

                newChecklist[key] = [];

                copyChecklist[key].map((element, index) => {

                    newChecklist[key].push({
                        ...element,
                        outputvalue: outputDocument[key][index].outputvalue
                    })
                })
            }

            const { error: errorUpdateChecklist } = await supabase
                .from('checklist')
                .update({ document: newChecklist })
                .eq('tipo', 'scania')
                .eq('tracto_id', tracto_id)

            if (errorUpdateChecklist) {
                throw new Error(`Error al actualizar el checklist, error: ${errorUpdateChecklist.message}`)
            }

            const { error: errorUpdateRegister } = await supabase
                .from('registros')
                .update({
                    destino: destino,
                    ot_salida: ot_salida,
                    user_salida_id: user_salida_id,
                    checkOut: checkOut,
                    status: 'finalizado'
                })
                .eq('id', tracto_id)

            if (errorUpdateRegister) {
                throw new Error(`Error al actualizar registro, error: ${errorUpdateRegister.message}`)
            }

            return { error }

        } catch (error) {
            console.error(error)
            return { error }
        }
    }

    async function routerChecklist(tipo, checklist, dataOutput) {
        try {
            const routes = {
                entrada: async () => await createInputChecklist(checklist),
                salida: async () => await updateOutputChecklist(checklist, dataOutput)
            }

            if (routes[tipo]) {
                return await routes[tipo]();
            } else {
                throw new Error('Error en el enrutador, ruta desconocida');
            }

        } catch (error) {
            console.error(error);
            return { error };
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

    return { routerChecklist, getOneInputChecklist, checklist, loading }

}

export { useChecklist };

