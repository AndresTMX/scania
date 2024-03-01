import { supabase } from "../../supabase";
import { sendImagesWhitMetadata } from "../../cloudinary";
import { useEffect, useState } from "react";

function useResponsives() {

    async function createResponsive(dataResponsive) {

        try {
            const { metadata } = dataResponsive;
            let imageData = metadata.length >= 1 ? await sendImagesWhitMetadata(metadata) : null;

            const { error, data } = await supabase
                .from('responsivas')
                .insert({ ...dataResponsive, metadata: imageData })
                .select('id')

            if (error) {
                throw new Error(`Error al subir nueva responsiva, error: ${error.message}`);
            }

            return { error, data };
        } catch (error) {
            console.error(error);
            return { error };
        }
    }


    return { createResponsive }

}

function useGetOneResponsive(idResponsive) {

    const [loading, setLoading] = useState(null);
    const [data, setData] = useState([])

    async function get() {
        try {
            setLoading(true)
            const { error, data } = await supabase
                .from('responsivas')
                .select(`*, registros(*), users(*)`)
                .eq('id', idResponsive)

            if (error) {
                throw new Error(`error al obtener responsiva, error: ${error}`)
            }
            setData(data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }

    useEffect(() => {
        get()
    }, [idResponsive])

    return { loading, data }

}

export { useResponsives, useGetOneResponsive };