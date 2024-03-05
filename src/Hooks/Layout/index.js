import { supabase } from "../../supabase";
import { useEffect, useState } from "react";


export function useLayout(stateDetault, bahia) {

    const [stateLayout, setStateLayout] = useState(stateDetault);
    const [update, setUpdate] = useState(false)

    async function getForBahia() {
        try {
            setStateLayout([])
            const { error, data } = await supabase
                .from('registros')
                .select('*', { count: 'exact' })
                .eq('bahia', bahia)

            if (error) {
                throw new Error(`Error al recuperar la disponibilidad de los tanques`)
            }

            const newState = actualizarEstadoPorDefecto(stateDetault, data);
            setStateLayout(newState)
            return { error, data }
        } catch (error) {
            console.error(error)

        }
    }

    function actualizarEstadoPorDefecto(estadoPorDefecto, datosAPI) {
        // Crear un objeto Map para indexar los objetos del estado por su clave única
        const estadoPorDefectoMap = new Map(
            estadoPorDefecto.map((objetoEstado) => [
                `${objetoEstado.bahia}-${objetoEstado.fila}-${objetoEstado.columna}`,
                objetoEstado
            ])
        );

        // Iterar sobre los datos de la API y actualizar los objetos del estado si es necesario
        datosAPI.forEach((objetoAPI) => {
            const clave = `${objetoAPI.bahia}-${objetoAPI.fila}-${objetoAPI.columna}`;
            if (estadoPorDefectoMap.has(clave)) {
                const objetoEstado = estadoPorDefectoMap.get(clave);
                // Actualizar el objeto existente con los datos de la API
                estadoPorDefectoMap.set(clave, { ...objetoEstado, ...objetoAPI });
            }
        });

        // Devolver los valores del Map como un array para obtener el nuevo estado
        return [...estadoPorDefectoMap.values()];
    }

    async function assignPosition(idTracto, fila, columna, bahia) {

        try {
            const { error } = await supabase
                .from('registros')
                .update({ columna, fila, bahia })
                .eq('id', idTracto)

            if (error) {
                throw new Error(`Error al actualizar posicion del tracto`)
            }

            return { error }
        } catch (error) {
            console.error(error)
        }
    }

    async function clearPosition(idTracto) {
        try {
            const { error } = await supabase
                .from('registros')
                .update({ nivel: null, columna: null, fila: null, bahia: null })
                .eq('id', idTracto)

            if (error) {
                throw new Error(`Error al actualizar posicion de tanque`)
            }

            return { error }
        } catch (error) {
            console.error(error)
            return { error }
        }
    }


    const changes = supabase
        .channel('schema-db-changes')
        .on(
            'postgres_changes',
            {
                schema: 'public',
                event: '*',
                table: 'registros'
            },
            (payload) => {
                setUpdate(!update)
            }
        )
        .subscribe()

    useEffect(() => {
        getForBahia()
        return () => {
            changes.unsubscribe();
        };

    }, [update]);


    return { stateLayout, assignPosition, clearPosition , }


}


