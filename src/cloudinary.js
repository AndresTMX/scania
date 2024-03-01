
const urlCloud = 'https://api.cloudinary.com/v1_1/dmvvbmsb6/image/upload';
export const cloudName = 'dmvvbmsb6';
export const folderChecklist = 'checklists'
export const presetName = 'iuldeywk'

export async function sendImageCloudinary(formData) {
    try {
        const response = await fetch(urlCloud, {
            method: 'POST',
            body: formData,

        });
        return response.json();
    } catch (error) {
        throw new Error(`Error al subir las imagenes del checklist`)
    }
}

export async function sendImagesWhitMetadata(arrayIaages) {
    try {

        const images = [];

        //crear el array de promesas
        const imagesForSend = arrayIaages.map(async (file) => {
            const formData = new FormData();
            formData.append('folder', folderChecklist);
            formData.append('upload_preset', `${presetName}`)
            formData.append('file', file.image);
            const request = await sendImageCloudinary(formData);
            images.push({ url: request.url })
        });

        try {
            await Promise.all(imagesForSend);
        } catch (error) {
            console.error(error)
            throw new Error(`Error al resolver promesa de imagenes`)
        }

        return images;

    } catch (error) {
        console.error(error)
    }
}