import { Button, Modal, ModalBody, ModalHeader, ModalContent, useDisclosure, ModalFooter, Chip } from "@nextui-org/react"
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { calendarFormat } from "moment";

export function Tracto({ item, index }) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const free = item?.status ? true : false;

    return (
        <div className="flex flex-col gap-2 items-center">

            {index === 0 &&
                <Chip size="sm" color="primary" radius='sm' className="text-white text-center font-bold min-w-[60px]">{item.columna}</Chip>
            }

            <Chip
                className="bg-gray-300 :hover cursor-pointer hover:bg-warning hover:text-white min-w-[60px]"
                size="sm"
                onClick={onOpen}
            >
                {free ? item.chasis : 'libre '}

            </Chip>

            <Modal className="absolute top-5" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Tractocamion</ModalHeader>
                            <ModalBody>

                                <Breadcrumbs>
                                    <BreadcrumbItem>{item.bahia}</BreadcrumbItem>
                                    <BreadcrumbItem>{item.columna}</BreadcrumbItem>
                                    <BreadcrumbItem>{item.fila}</BreadcrumbItem>
                                    <BreadcrumbItem>{item.chasis}</BreadcrumbItem>
                                </Breadcrumbs>

                                <div>
                                    <p>Ingreso</p>
                                    <span></span>
                                </div>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" size="sm" variant="light" onPress={onClose}>
                                    retirar tractocamión
                                </Button>
                                <Button color="primary" size="sm" className="text-white" onPress={onClose}>
                                    asignar posición
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}