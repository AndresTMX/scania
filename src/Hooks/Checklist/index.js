import { useState } from "react";
import { supabase } from "../../supabase";
import { sendImageCloudinary, folderChecklist, presetName } from "../../cloudinary";
//helpers
import { currentDateTimeZone } from "../../helpers/datetime";

function useChecklist() {

    const [checklist, setChecklist] = useState([])
    const [loading, setLoading] = useState(null)

    /*/AGREGAR NUEVO CHECKLIST DE REVISION /*/
    async function createInputChecklist(checklist, tipoRegistro) {
        try {

            const { tracto_id, tipo, document } = checklist;

            const checklistWhitImages = await uploadImagesChecklist(document, tipoRegistro);

            // subir el checklist de entrada
            const { error } = await supabase
                .from('checklist')
                .insert({ document: checklistWhitImages, tracto_id, tipo })

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

    async function updateOutputChecklist(checklist, dataOutput, tipoRegistro) {

        try {
            const checkOut = currentDateTimeZone._d;
            const { tracto_id, document: outputDocument } = checklist;
            const { ot_salida, user_salida_id, destino } = dataOutput;

            const { error, data: oldChecklist } = await supabase
                .from(`checklist`)
                .select(`*`)
                .eq('tipo', 'scania')
                .eq('tracto_id', tracto_id)

            if (error) {
                throw new Error(`Error al recuperar checklist de entrada, error: ${error.message} `)
            }

            const oldDocument = oldChecklist[0]['document'];

            const checklistWhitImages = await uploadImagesChecklist(outputDocument, tipoRegistro);

            const keysDocument = Object.keys(checklistWhitImages);

            const newDocument = {};

            for (const keySection of keysDocument) {

                const inputSection = oldDocument[keySection]

                const outputSection = checklistWhitImages[keySection]

                const newSection = inputSection.map((question, index) => {

                    const copyQuestion = { ...question }

                    if (copyQuestion.type === 'checkbox' || copyQuestion.type === 'input') {
                        copyQuestion.outputvalue = outputSection[index].outputvalue
                        copyQuestion.outputImage = outputSection[index].outputImage
                    }

                    if (copyQuestion.type === 'textarea') {
                        copyQuestion.outputvalue = outputSection[index].outputvalue
                    }

                    if (copyQuestion.type === 'image') {
                        copyQuestion.outputvalue = outputSection[index].outputvalue
                    }

                    return { ...copyQuestion }

                })

                newDocument[keySection] = newSection;

            }

            const { error: errorUpdateChecklist } = await supabase
                .from('checklist')
                .update({ document: newDocument })
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
                    status: 'finalizado',
                    status_llaves:'entregadas'
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
                entrada: async () => await createInputChecklist(checklist, tipo),
                salida: async () => await updateOutputChecklist(checklist, dataOutput, tipo)
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

    async function uploadImagesChecklist(checklist, tipoRegistro) {
        try {

            const keysDocument = Object.keys(checklist);

            const newDocument = {};

            for (const keySection of keysDocument) {

                const section = checklist[keySection]

                const sectionWhitImages = section.filter((question) => question.preview && question.preview != '')

                if (sectionWhitImages.length >= 1) {
                    const arrayWhitUrls = await sendCloundinary(sectionWhitImages, tipoRegistro);
                    const newSection = sincronizarArraysPorPregunta(section, arrayWhitUrls)
                    newDocument[keySection] = newSection;
                } else {
                    newDocument[keySection] = section;
                }
            }

            return newDocument

        } catch (error) {
            console.error(error)
        }
    }

    const sendCloundinary = async (arrayQuestions, tipoRegistro) => {
        try {

            const questionsWhitImage = ['input', 'checkbox']
            const keyValue = tipoRegistro === 'entrada' ? 'inputvalue' : 'outputvalue';
            const keyImage = tipoRegistro === 'entrada' ? 'inputImage' : 'outputImage';

            //extraer las imagenes y cambiarles el nombre
            const imagesWhitName = arrayQuestions.map((question) => {
                let keyQuestion = questionsWhitImage.includes(question.type) ? 'file' : keyValue;
                const oldFile = question[keyQuestion];
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

            //copia profunda del array original 
            const copyFlatInString = JSON.stringify(arrayQuestions);
            const copyFlatInJson = JSON.parse(copyFlatInString);

            //copia del array original con los cambios listos para enviar la data
            const arrayWhitUrls = copyFlatInJson.map((item) => {
                const newItem = { ...item }
                const keyQuestion = questionsWhitImage.includes(newItem.type) ? keyImage : keyValue;
                const indexImage = links.findIndex((link) => link.question === item.question);
                if (questionsWhitImage.includes(newItem.type)) {
                    newItem[keyQuestion] = links[indexImage].url
                    newItem['preview'] = ""
                } else if (!questionsWhitImage.includes(newItem.type)) {
                    newItem[keyQuestion] = links[indexImage].url
                    newItem['file'] = ""
                    newItem['preview'] = ""
                }

                return newItem
            })

            return arrayWhitUrls;

        } catch (error) {
            console.error(error)
        }
    }

    function sincronizarArraysPorPregunta(array1, array2) {
        // Creamos un mapa para almacenar los objetos del segundo array por pregunta
        const mapa2 = new Map();

        // Llenamos el mapa para el segundo array
        array2.forEach(objeto => {
            mapa2.set(objeto.question, objeto);
        });

        // Creamos un nuevo array para almacenar los objetos sincronizados
        const arraySincronizado = [];

        // Iteramos sobre el primer array
        array1.forEach(objeto => {
            const pregunta = objeto.question;

            // Verificamos si la pregunta existe en el segundo array y si el objeto del primer array tiene claves vacías
            if (mapa2.has(pregunta) && Object.values(objeto).some(value => value === "" || value === null || typeof value === "undefined")) {
                // Si existe y el objeto del primer array tiene claves vacías, obtenemos el objeto correspondiente del segundo array
                const objeto2 = mapa2.get(pregunta);

                // Creamos un nuevo objeto sincronizado copiando las claves llenadas del segundo objeto
                const objetoSincronizado = { ...objeto, ...objeto2 };

                // Agregamos el objeto sincronizado al nuevo array
                arraySincronizado.push(objetoSincronizado);
            } else {
                // Si la pregunta no existe en el segundo array o el objeto del primer array no tiene claves vacías, agregamos el objeto del primer array tal cual
                arraySincronizado.push(objeto);
            }
        });

        return arraySincronizado;
    }

    return { routerChecklist, getOneInputChecklist, checklist, loading }

}

export { useChecklist };

