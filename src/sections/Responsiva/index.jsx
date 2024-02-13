import { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { Input, Select, SelectItem, Textarea, Card, Image, Button } from "@nextui-org/react";
import { DownloadResponsive, ResponsivaTaller } from "../../PDF/plantillas/responsiva";
import { PDFViewer } from "@react-pdf/renderer";


function Responsiva() {

    const { id, chasis } = useParams();

    const personal = ['personal 1', 'personal 2', 'personal 3']

    const [images, setImages] = useState([]);

    const navigate = useNavigate();

    const backToInit = () => {
        navigate('/')
    }


    const onChangueFiles = (e) => {
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

                <div className="flex flex-col items-center py-10 h-full overflow-x-auto">

                    {/* <form className=" lg:w-[500px] rounded-md max-w-md: w-full max-w-[500px] bg-white lg:p-4 max-md:p-2 max-sm:p-2">
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
                                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                            Personal que recibe
                                        </label>
                                        <div className="mt-2">
                                            <Select
                                                size="sm"
                                                type="text"
                                                name=""
                                                id="username"
                                                autoComplete="username"
                                                placeholder="janesmith"
                                                className="input-light-base"
                                            >
                                                {personal.map((element) => (
                                                    <SelectItem key={element}>{element}</SelectItem>
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
                                                defaultValue={''}
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
                                fullWidth
                                type="submit"
                                color="primary"
                            >
                                Registrar
                            </Button>
                        </div>
                    </form> */}

                    <div className="flex flex-col p-2 rounded-md h-screen w-5/6 items-center border border-border shadow-lg gap-2">
                        <div className=" flex flex-row justify-end w-5/6 ">
                            <DownloadResponsive />
                        </div>
                        <PDFViewer
                            showToolbar={false}
                            style={{ width: '90%', height: '90%' }}>
                            <ResponsivaTaller />
                        </PDFViewer>
                    </div>


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
                        <div className="relative input-light-base min-w-[80px]">
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