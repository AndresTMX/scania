import { Toaster, toast } from "sonner";
import { Outlet, useLocation } from "react-router-dom";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import { TableInputs } from "../../components/TableInputs";
import { TableOutputs } from "../../components/TableOutputs";
import { useRegister } from "../../Hooks/Registers";
import { Input, Select, SelectItem, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Tabs, Tab } from "@nextui-org/react";


function Ingreso() {

    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

    const { pathname } = useLocation();

    return (
        <section className="flex flex-col h-screen justify-start">

            <Toaster richColors position="top-center" />

            {pathname === '/' &&
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

                        </Tabs>

                    </div>
                </section>}

            <FormNewRegister isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} />

            <Outlet />

        </section>
    );
}

export { Ingreso };

export function FormNewRegister({ isOpen, onOpenChange, onClose }) {

    const { addRegister } = useRegister();

    const optionsModel = [
        {
            id: 'kqwenuiqwe',
            model: 'tipo 1'
        },
        {
            id: 'wqedqefqre',
            model: 'tipo 2'
        },
        {
            id: 'ehterheyj',
            model: 'tipo 3'
        },
    ]

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

                                <Select
                                    id="id_tipo"
                                    aria-label="tipo_label"
                                    placeholder="Tipo de tracto"
                                    name="tipo"
                                >
                                    {optionsModel.map((element) => (
                                        <SelectItem key={element.model} >{element.model}</SelectItem>
                                    ))}
                                </Select>

                                <Input
                                    id="id_modelo"
                                    aria-label="model_label"
                                    placeholder="Módelo"
                                    name="modelo"
                                />

                                <Input
                                    id="id_ot"
                                    aria-label="ot_label"
                                    placeholder="OT"
                                    name="ot"
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
