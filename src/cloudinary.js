
const urlCloud = 'https://api.cloudinary.com/v1_1/dmvvbmsb6/image/upload';
export const cloudName = 'dmvvbmsb6';
export const folderChecklist ='checklists'
export const presetName ='iuldeywk'

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