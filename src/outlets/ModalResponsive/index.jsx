import { PDFViewer } from "@react-pdf/renderer";
import { Spinner, Button } from "@nextui-org/react";
import { Modal } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { DownloadResponsive, ResponsivaTaller } from "../../PDF/plantillas/responsiva";
//hooks
import { useGetOneResponsive } from "../../Hooks/Responsivas";
import { useInfoUser } from "../../Hooks/Users";

function ModalResponsive({ modal, setModal, idResponsiva }) {

    const { loading, data } = useGetOneResponsive(idResponsiva)

    const { created_at, llaves, metadata, users, responsable } = data[0] || {};
    const { nombre, apellido } = users || {};

    const { infoUser: nombreResponsable } = useInfoUser(responsable)
    const nombreEntrega = users ? `${nombre} ${apellido}` : 'no disponible';

    const dataResponsive = { created_at, llaves, nombreResponsable, nombreEntrega }

    return (
        <>
            <Modal open={modal} >
                <div className="flex flex-col h-screen w-screen justify-center items-center">
                    <div className="flex flex-col gap-2 h-[80vh] w-[90%] bg-body rounded-md" >
                        <div className="flex flex-row justify-between items-center p-2">
                            <Button
                                onPress={() => setModal(!modal)}
                                size="sm"
                                color="danger"
                                isIconOnly>
                                <IoClose />
                            </Button>
                            <DownloadResponsive dataResponsive={dataResponsive} />
                        </div>
                        <div className="flex flex-col items-center h-full">
                            {loading &&
                                <div className="flex flex-col items-center justify-center  h-full w-full bg-gray-200 ">
                                    <Spinner size='lg' label="cargando responsiva..." color="primary" />
                                </div>}

                            {!loading &&
                                <PDFViewer
                                    style={{ width: '95%', height: '95%' }}>
                                    <ResponsivaTaller dataResponsive={dataResponsive} />
                                </PDFViewer>}
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export { ModalResponsive };