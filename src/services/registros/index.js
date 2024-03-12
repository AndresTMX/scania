import { supabase } from "../../supabase"

export async function getRegistersForAssigned() {
    try {
        const { error, data } = await supabase
            .from('registros')
            .select('*')
            .is('bahia', null)

        if (error) {
            throw new Error(`Error al obtener registros de tractos, error: ${error.message}`)
        }

        return { error, data }
    } catch (error) {
        console.error(error)
    }
}

export async function assignedPositionInBahia(dataPosition) {
    try {

        const { bloque, fila, columna, id } = dataPosition;

        const { error } = await supabase
            .from('registros')
            .update({ ...dataPosition })
            .eq('id', id)

        if (error) {
            throw new Error(`Error al asignar posicion, error: ${error.message}`)
        }

        return { error }
    } catch (error) {
        console.error(error)
    }
}

export async function changueStatusTracto(idTracto, newStatus) {
    try {
        const { error } = await supabase
            .from('registros')
            .update({ status_llaves: newStatus })
            .eq('id', idTracto)

        if (error) {
            throw new Error(`Error al cambiar estatus de tracto, error:${error.message}`)
        }
        return { error }
    } catch (error) {
        console.error(error)
    }
}

export async function clearPositionTracto(idTracto) {
    try {
        const { error } = await supabase
            .from('registros')
            .update({ bahia: null, fila: null, columna: null })
            .eq('id', idTracto)

        if (error) {
            throw new Error(`Error al cambiar estatus de tracto, error:${error.message}`)
        }
        return { error }
    } catch (error) {
        console.error(error)
    }
}

export async function getAllRegistersActive() {
    try {

        const startDate = '2024-03-06T00:00:00Z';
        const endDate = '2024-03-07T00:00:00Z';

        const { error, data } = await supabase
            .from('registros')
            .select('*')
            .filter('checkIn', 'gte', startDate)
            .filter('checkIn', 'lt', endDate);

        if (error) {
            throw new Error(`Error al obtener registros, error: ${error.message}`)
        }

        console.log(data)
        return { error, data }

    } catch (error) {
        console.error(error)
    }
}
