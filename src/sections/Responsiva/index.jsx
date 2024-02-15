import { useState, useEffect } from "react";
import { CiImageOn } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { Input, Select, SelectItem, Textarea, Image, Button } from "@nextui-org/react";
import { DownloadResponsive, ResponsivaTaller } from "../../PDF/plantillas/responsiva";
import { PDFViewer } from "@react-pdf/renderer";
import { toast, Toaster } from "sonner";
import { useUsers } from "../../Hooks/Users/index,";
import { useTaller } from "../../Hooks/Taller";


function Responsiva() {

    const { id, chasis } = useParams();

    const { dataUsers } = useUsers('taller');

    const { addRegister, gettAllRegisters, registers } = useTaller();

    useEffect(() => {
        gettAllRegisters();
    }, [id])

    const personal = [
        {
            id: '1',
            user: 'personal de taller 1'
        },
        {
            id: '2',
            user: 'personal de taller 2'
        },
        {
            id: '3',
            user: 'personal de taller 3'
        },
    ]

    const [renderPDF, setRenderPDF] = useState(false)

    const [images, setImages] = useState([]);

    const [form, setForm] = useState({ user_id: '', coment: '' })

    const navigate = useNavigate();

    const backToInit = () => {
        navigate('/')
    }

    const onChangueFiles = (e) => {
        e.preventDefault();

        const reader = new FileReader();

        const file = e.target.files[0];
        const urlImage = URL.createObjectURL(file);
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = (e) => {
            e.preventDefault();

            const target = e.target
            const result = target.result;
            const copyState = images?.length >= 1 ? [...images] : [];
            copyState.push({
                image: file,
                preview: urlImage,
                reader: result
            })
            setImages(copyState);
        };

    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (form.user_id === '') {
            toast.error('Comleta el formulario para continuar')
        } else {
            toast.success('Generando documento')
            // await addRegister({ tipo: 'entrada', register_id: id, user_id: form.user_id })
            setRenderPDF(!renderPDF)
        }

    }

    return (
        <>
            <div className="flex flex-col h-screen p-4 bg-body">

                <Button
                    className="text-white"
                    onPress={backToInit}
                    color="primary"
                    isIconOnly>
                    <FaArrowLeft />
                </Button>

                <Toaster richColors position="top-center" />

                <div className="flex flex-col items-center py-10 h-full overflow-x-auto">

                    {!renderPDF &&
                        <form onSubmit={onSubmit}
                            className=" lg:w-[500px] input-light-base max-w-md: w-full max-w-[500px] bg-white lg:p-4 max-md:p-2 max-sm:p-2 p-4">
                            <div className="space-y-5">

                                <div className="border-b border-gray-900/10 pb-5">

                                    <div>
                                        <h2 className="text-base font-semibold leading-7 text-primary">
                                            Responsiva de entrega de tracto a taller con chasis {chasis}
                                        </h2>
                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                            Llena la información solicitada para generar la responsiva.
                                        </p>
                                    </div>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                        <div className="sm:col-span-4">
                                            <label htmlFor="user_id" className="block text-sm font-medium leading-6 text-gray-900">
                                                Personal que recibe
                                            </label>
                                            <div className="mt-2">
                                                <Select
                                                    required
                                                    size="sm"
                                                    id="user_id"
                                                    name="user_id"
                                                    aria-label="user_id"
                                                    className="input-light-base"
                                                    value={form.user_id}
                                                    onChange={(e) => setForm({ ...form, user_id: e.target.value })}
                                                >
                                                    {dataUsers && dataUsers.map((element) => (
                                                        <SelectItem key={element.id}>{`${element.nombre}  ${element.apellido}`}</SelectItem>
                                                    ))}
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="comentarios" className="block text-sm font-medium leading-6 text-gray-900">
                                                Comentarios adicionales
                                            </label>
                                            <div className="mt-2">
                                                <Textarea
                                                    rows={3}
                                                    id="comentarios"
                                                    name="comentarios"
                                                    aria-label="comentarios"
                                                    value={form.coment}
                                                    onChange={(e) => setForm({ ...form, coment: e.target.value })}
                                                    className="input-light-base"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2 col-span-full">
                                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                                Anexa imagenes de condiciones de entrega
                                            </label>

                                            <div className="relative w-full h-full p-4 mx-auto text-gray-300 r-only input-light-base">
                                                <div className="relative top-0 z-0 flex flex-col text-sm leading-6 text-center text-gray-600">
                                                    <span>subir evidencias</span>
                                                    <CiImageOn className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                                </div>
                                                <input
                                                    onChange={(e) => onChangueFiles(e)}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-1"
                                                    accept="image/*"
                                                    name="images"
                                                    id="images"
                                                    type="file"
                                                    multiple
                                                />
                                            </div>

                                        </div>

                                        <div className="flex flex-col gap-2 col-span-full">
                                            <PreviewsImages images={images} setImages={setImages} />
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <Button
                                    className="text-white"
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                >
                                    Registrar
                                </Button>
                            </div>
                        </form>}

                    {renderPDF &&
                        <div className="flex flex-col p-2 rounded-md h-screen w-5/6 items-center border border-border shadow-lg gap-2">
                            <div className=" flex flex-row justify-end w-5/6 ">
                                <DownloadResponsive />
                            </div>
                            <PDFViewer
                                style={{ width: '100%', height: '100%' }}>
                                <ResponsivaTaller />
                            </PDFViewer>
                        </div>}


                </div>

            </div>

        </>
    );
}

export { Responsiva };

export function PreviewsImages({ images, setImages }) {

    const deleteImage = (index) => {
        const copyState = images.length >= 1 ? [...images] : [];

        copyState.splice(index, 1);

        setImages(copyState)

    }

    return (
        <>
            {images.length >= 1 &&
                <div className="flex flex-row items-center gap-1 h-full w-full overflow-y-auto bg-body p-2">

                    {images.map((element, index) => (
                        <div key={index} className="relative input-light-base min-w-[80px]">
                            <Image
                                className="h-[80px] w-[80px] z-1 input-light-base"
                                isZoomed
                                width='100%'
                                alt="preview-image"
                                src={element.preview}
                            />
                            <Button
                                onPress={() => deleteImage(index)}
                                size="sm"
                                color='danger'
                                className="absolute p-0 h-[20px] w-[20px] top-0"
                                isIconOnly>
                                <MdDelete />
                            </Button>
                        </div>
                    ))}

                </div>}
        </>
    )
}