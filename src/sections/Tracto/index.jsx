import { Button, Card, Modal, ModalBody, ModalHeader, ModalContent, useDisclosure, ModalFooter, Tooltip } from "@nextui-org/react"
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
//icons
import { FaBus } from "react-icons/fa";

export function Tracto({ item }) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const free = item?.status ? true : false;

    return (
        <>
            <Card>
                <Tooltip content={free ? item.chasis : 'libre'} >
                    <Button
                        size="sm"
                        isIconOnly
                        color={free ? "warning" : "primary"}
                        className="text-white"
                        onPress={() => onOpen()}
                    >
                        <FaBus />
                    </Button>
                </Tooltip>
            </Card>

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

                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}