import { supabase } from "../../supabase";
import { sendImagesWhitMetadata } from "../../cloudinary";

export async function createNewResponsive(dataResponsive) {
    try {
        const { metadata, llaves } = dataResponsive;
        let imageData = metadata.length >= 1 ? await sendImagesWhitMetadata(metadata) : null;

        //crear responsiva
        const { error } = await supabase
            .from('responsivas')
            .insert({ ...dataResponsive, metadata: imageData })

        if (error) {
            throw new Error(`Error al subir nueva responsiva, error: ${error.message}`);
        }

        //actualizar status de los tractos
        const promises = llaves.map(async (tracto) => {

            const { error: errorUpdate } = await supabase
                .from('registros')
                .update({ status: 'taller' })
                .eq('id', tracto.id)

            if (errorUpdate) {
                console.error(errorUpdate.message)
                throw new Error(`Error actualizar estatus de tractocamión, error: ${errorUpdate?.message}`);
            }
        })

        try {
            await Promise.all(promises)
        } catch (error) {
            throw new Error(error)
        }
        //registrar movimientos de taller
        const promisesTaller = llaves.map(async (tracto) => {

            const { error } = await supabase
                .from('movimientos_taller')
                .insert({ tipo: 'entrada', registro_id: tracto.id })

            if (error) {
                throw new Error(`Error al registrar movimiento, error:${error.message}`)
            }

        })

        try {
            await Promise.all(promisesTaller)
        } catch (error) {
            throw new Error(error)
        }

        return { error };
    } catch (error) {
        return { error }
    }
}