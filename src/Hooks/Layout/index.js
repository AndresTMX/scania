import { supabase } from "../../supabase";
import { useEffect, useState, useMemo } from "react";


export function useLayout(stateDetault, bahia) {

    const [stateLayout, setStateLayout] = useState(stateDetault);
    const [update, setUpdate] = useState(false)

    async function getForBahia() {
        try {
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

    // function actualizarEstadoPorDefecto(estadoPorDefecto, datosAPI) {
    //     // Copiar el estado por defecto para evitar modificarlo directamente
    //     const nuevoEstado = [...estadoPorDefecto];

    //     // Iterar sobre los datos de la API
    //     datosAPI.forEach((objetoAPI) => {
    //         // Buscar objetos en el estado por defecto con las mismas fila y columna
    //         const objetoExistente = nuevoEstado.find((objeto) => {
    //             return objeto.bahia === objetoAPI.bahia && objeto.fila === objetoAPI.fila && objeto.columna === objetoAPI.columna;
    //         });

    //         // Si se encuentra un objeto coincidente, actualizarlo con los datos de la API
    //         if (objetoExistente) {
    //             // Reemplazar el objeto existente con los datos de la API
    //             Object.assign(objetoExistente, objetoAPI);
    //         }
    //     });

    //     return nuevoEstado;
    // }

    function actualizarEstadoPorDefecto(estadoPorDefecto, datosAPI) {
        const estadoPorDefectoMap = new Map(
            estadoPorDefecto.map((objetoEstado) => [
                `${objetoEstado.bahia}-${objetoEstado.fila}-${objetoEstado.columna}`,
                objetoEstado
            ])
        );

        datosAPI.forEach((objetoAPI) => {
            const clave = `${objetoAPI.bahia}-${objetoAPI.fila}-${objetoAPI.columna}`;
            if (estadoPorDefectoMap.has(clave)) {
                const objetoEstado = estadoPorDefectoMap.get(clave);
                estadoPorDefectoMap.set(clave, { ...objetoEstado, ...objetoAPI });
            }
        });

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


    return { stateLayout, assignPosition, clearPosition }


}


