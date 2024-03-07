import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Image } from "@nextui-org/react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function ImagesResponsive() {

    const { metadata } = useParams();

    const images = metadata ? JSON.parse(decodeURIComponent(metadata)) : {};

    useEffect(() => {
        onOpen()
    }, [])

    const navigate = useNavigate()

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const CloseModal = () => {
        navigate('/')
        onClose()
    }

    const OnchangueModal = () => { onOpenChange(), navigate('/') }

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={OnchangueModal}>
                <ModalContent className="w-fit max-h-[500px] overflow-auto">
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Evidencias</ModalHeader>
                            <ModalBody>
                                {images.length > 0 && images.map((img) => (
                                    <Image src={img.url} alt='eividence' />
                                ))}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </>
    );
}
