import { useState } from "react";
import { supabase } from "../../supabase";
import { sendImageCloudinary, folderChecklist, presetName } from "../../cloudinary";

function useChecklist() {

    const [checklist, setChecklist] = useState([])
    const [loading, setLoading] = useState(null)

    /*/AGREGAR NUEVO CHECKLIST DE REVISION /*/
    async function createInputChecklist(checklist, keyImage) {
        try {

            const { tracto_id, tipo, document } = checklist;

            const checklistWhitImages = await uploadImagesChecklist(document, keyImage);
            console.log("🚀 ~ createInputChecklist ~ checklistWhitImages:", checklistWhitImages)
            // subir el checklist de entrada
            // const { error } = await supabase
            //     .from('checklist')
            //     .insert({document:checklistWhitImages, tracto_id, tipo})

            // if (error) {
            //     throw new Error(`Error al subir checklist de entrada, error: ${error.message}`)
            // }

            // //actualizar el estatus del tracto
            // const { error: errorUpdadeStatus } = await supabase
            //     .from('registros')
            //     .update({ status: 'revisado-entrada' })
            //     .eq('id', tracto_id)

            // if (errorUpdadeStatus) {
            //     throw new Error(`Error al actualizar status del registro de entrada, error: ${errorUpdadeStatus.message}`)
            // }

            return { error }

        } catch (error) {
            console.error(error)
            return { error }
        }
    }

    async function updateOutputChecklist(checklist, dataOutput, keyImage) {
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

            const keyValue = tipo === 'entrada' ? 'inputvalue' : 'outputvalue';

            const routes = {
                entrada: async () => await createInputChecklist(checklist, keyValue),
                salida: async () => await updateOutputChecklist(checklist, dataOutput, keyValue)
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
                .eq('tipo', 'scania');

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

    async function uploadImagesChecklist(checklist, keyValue) {
        try {

            const keysDocument = Object.keys(checklist);

            const newDocument = {};

            for (const keySection of keysDocument) {

                const section = checklist[keySection]

                const sectionWhitImages = section.filter((question) => question.preview && question.preview != '')
                console.log("🚀 ~ uploadImagesChecklist ~ sectionWhitImages:", sectionWhitImages)

                if (sectionWhitImages.length >= 1) {
                    const arrayWhitUrls = await sendCloundinary(sectionWhitImages, keyValue);
                    newDocument[keySection] = arrayWhitUrls;
                } else {
                    newDocument[keySection] = section;
                }
            }

            return newDocument

        } catch (error) {
            console.error(error)
        }
    }

    const sendCloundinary = async (arrayQuestions, keyValue) => {
        try {
            
            //extraer las imagenes y cambiarles el nombre
            const imagesWhitName = arrayQuestions.map((question) => {
                const oldFile = question[keyValue];
                return new File([oldFile], question.question, { type: oldFile.type });
            });

            //extraer los objetos para mapearlos
            const arrayFiles = Object.values(imagesWhitName)
            const links = [];

            //crear el array de promesas
            const sendImages = arrayFiles.map(async (file) => {
                const formData = new FormData();
                formData.append('folder', folderChecklist);
                formData.append('upload_preset', `${presetName}`)
                formData.append('file', file);
                const request = await sendImageCloudinary(formData);
                links.push({ url: request.url, question: request.original_filename })
            });

            //resolver promesas
            try {
                await Promise.all(sendImages);
            } catch (error) {
                console.error(error)
                throw new Error(`Error al resolver promesa de imagenes`)
            }

            console.log(links)

            //copia profunda del array original 
            const copyFlatInString = JSON.stringify(arrayQuestions);
            const copyFlatInJson = JSON.parse(copyFlatInString);

            //copia del array original con los cambios listos para enviar la data
            const arrayWhitUrls = copyFlatInJson.map((item) => {
                const newItem = item
                if (newItem.preview && newItem.preview != '') {
                    const indexImage = links.findIndex((link) => link.question === item.question)
                    newItem[keyValue] = links[indexImage].url
                    newItem['preview'] = ""
                }
                return newItem
            })

            return arrayWhitUrls;

        } catch (error) {
            console.error(error)
        }
    }

    return { routerChecklist, getOneInputChecklist, checklist, loading }

}

export { useChecklist };

