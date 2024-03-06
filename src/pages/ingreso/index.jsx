import { TableInputs } from "../../components/TableInputs";
import { TableOutputs } from "../../components/TableOutputs";
import { TableResponsives } from "../../components/TableResponsivas";
import { Input, Select, SelectItem, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Tabs, Tab, Chip, Textarea, Image } from "@nextui-org/react";
//hooks
import { useState } from "react";
import { useUsers } from "../../Hooks/Users";
import { useRegister } from "../../Hooks/Registers";
//libreries
import { Toaster, toast } from "sonner";
import { Outlet } from "react-router-dom";
//icons
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { IoAddOutline } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

function Ingreso() {

    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
    const { isOpen: openResponsive, onOpen: onOpenResponsive, onClose: onCloseResponsive, onOpenChange: onChangueResponsive } = useDisclosure()


    return (
        <section className="flex flex-col h-screen justify-start">

            <Toaster richColors position="top-center" />

            <section className="flex flex-col max-w-full">
                <div className="flex flex-col items-start gap-1 w-full px-0 py-4 max-md:items-center">

                    <Tabs aria-label="Options" color="primary" variant="bordered" className="text-white">

                        <Tab
                            key="entradas"
                            title={
                                <div className="flex items-center space-x-2">
                                    <FaArrowCircleDown />
                                    <span>Entradas</span>
                                </div>
                            }
                        >
                            <TableInputs onOpen={onOpen} />
                        </Tab>

                        <Tab
                            key="salidas"
                            title={
                                <div className="flex items-center space-x-2">
                                    <FaArrowCircleUp />
                                    <span>Salidas</span>
                                </div>
                            }
                        >
                            <div className="max-w-[750px]">
                                <TableOutputs />
                            </div>

                        </Tab>

                        <Tab
                            key="responsivas"
                            title={
                                <div className="flex items-center space-x-2">
                                    <HiOutlineClipboardDocumentList />
                                    <span>responsivas</span>
                                </div>
                            }
                        >
                            <div className="max-w-[750px]">
                                <TableResponsives onOpen={onOpenResponsive} />
                            </div>

                        </Tab>

                    </Tabs>

                </div>
            </section>

            <FormNewRegister isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} />
            <FormNewResponsive isOpen={openResponsive} onOpenChange={onChangueResponsive} onClose={onCloseResponsive} />

            <Outlet />

        </section>
    );
}

export { Ingreso };

export function FormNewRegister({ isOpen, onOpenChange, onClose }) {

    const { addRegister } = useRegister();

    const optionsType = ['chasis corto', 'chasis largo', 'tractocamion', 'super scania ', 'otro']

    const onSubmit = async (e) => {

        e.preventDefault();

        const target = e.target;

        const formValues = {}

        const form = new FormData(target)

        for (const [name, value] of form.entries()) {
            formValues[name] = value;
        }

        const arrayValues = Object.values(formValues);

        const emptyValues = arrayValues.filter((value) => value.trim() === '')

        if (emptyValues.length > 0) {
            toast.error('Complete el formulario para continuar')
        } else {
            onClose()
            const { error } = await addRegister(formValues)

            if (error === null) {
                toast.success('Registro guardado')
            } else {
                toast.success('error: ' + error?.message)
            }
        }
    }

    return (

        <Modal
            isOpen={isOpen}
            isDismissable={false}
            placement='top-center'
            scrollBehavior='inside'
            onOpenChange={onOpenChange}
        >
            <Toaster richColors position="top-center" />
            <ModalContent >
                {(onClose) => (
                    <form onSubmit={onSubmit} className="flex flex-col p-2 max-h-full overflow-y-auto" >
                        <ModalHeader className="flex flex-col gap-1">Registro de entrada</ModalHeader>
                        <ModalBody className="h-full">

                            <section className="flex flex-col gap-4">

                                <Input
                                    id="id_chasis"
                                    aria-label="chasis_label"
                                    placeholder="Chasis"
                                    name="chasis"
                                />

                                <Input
                                    id="id_llaves"
                                    aria-label="llaves_label"
                                    placeholder="5"
                                    description="cantidad de llaves"
                                    name="laves"
                                />

                                <Select
                                    id="id_tipo"
                                    aria-label="tipo_label"
                                    placeholder="Tipo de tracto"
                                    name="tipo"
                                >
                                    {optionsType.map((element) => (
                                        <SelectItem key={element} >{element}</SelectItem>
                                    ))}
                                </Select>

                                <Input
                                    id="id_modelo"
                                    aria-label="model_label"
                                    placeholder="Módelo"
                                    name="modelo"
                                />

                                <Input
                                    id="id_origen"
                                    aria-label="origen_label"
                                    placeholder="Origen"
                                    name="origen"
                                />


                            </section>

                        </ModalBody>

                        <ModalFooter className="flex flex-row justify-between" >

                            <Button
                                fullWidth
                                type="submit"
                                color="secondary"
                                className="text-white"
                                variant='solid' >
                                Registrar
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>

    )
}

export function FormNewResponsive({ isOpen, onOpenChange, onClose, }) {

    const { dataUsers } = useUsers('taller');

    const [images, setImages] = useState([]);

    const [form, setForm] = useState({ user_id: '', coment: '' })

    const tractos = JSON.parse(localStorage.getItem('registros') || '[]');

    const [listKeys, setListKeys] = useState([])

    const toggleKey = (key) => {
        const copyState = listKeys.length >= 1 ? [...listKeys] : [];
        let existKey = listKeys.find((element) => element === key);

        if (existKey === undefined) {
            copyState.push(key)
            setListKeys(copyState)
        } else {
            const index = copyState.findIndex((element) => element === key);
            copyState.splice(index, 1)
            setListKeys(copyState)
        }
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

    const tractosForResponsive = tractos.length > 1 ? tractos.filter((tracto) => tracto.status === 'revisado-entrada') : []

    return (
        <>

            <Modal
                isOpen={isOpen}
                isDismissable={false}
                placement='top-center'
                scrollBehavior='inside'
                onOpenChange={onOpenChange}
            >
                <Toaster richColors position="top-center" />
                <ModalContent >
                    {(onClose) => (
                        <form onSubmit={() => console.log('form action')} className="flex flex-col p-2 max-h-full overflow-y-auto" >
                            <ModalHeader className="flex flex-col gap-1">Nueva responsiva</ModalHeader>
                            <ModalBody className="h-full">

                                <section className="flex flex-col gap-4">

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
                                                    <SelectItem key={element.auth_id}>{`${element.nombre}  ${element.apellido}`}</SelectItem>
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

                                    <div className="col-span-full">
                                        <label htmlFor="comentarios" className="block text-sm font-medium leading-6 text-gray-900">
                                            Selecciona las llaves a prestar
                                        </label>
                                        <div className="mt-2 h-[100px] input-light-base bg-input">
                                            <div className="flex flex-row flex-wrap gap-2 p-2 ">
                                                {tractosForResponsive.length >= 1 && tractosForResponsive.map((tracto) => (
                                                    <Chip
                                                        className={listKeys.includes(tracto.chasis) ? 'text-white' : 'text-gray-700'}
                                                        key={tracto.chasis}
                                                        color={listKeys.includes(tracto.chasis) ? 'primary' : 'default'}
                                                        endContent={<IoAddOutline />}
                                                        onClose={() => toggleKey(tracto.chasis)}
                                                        variant="shadow" >
                                                        {tracto.chasis}
                                                    </Chip>
                                                ))}
                                            </div>
                                        </div>
                                    </div>


                                </section>

                            </ModalBody>

                            <ModalFooter className="flex flex-row justify-between" >

                                <Button
                                    fullWidth
                                    type="submit"
                                    color="secondary"
                                    className="text-white"
                                    variant='solid' >
                                    generar
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>


        </>
    )
}

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
