import { PDFViewer } from "@react-pdf/renderer";
import { Button, Spinner } from "@nextui-org/react";
import { DownloadResponsive, ResponsivaTaller } from "../../PDF/plantillas/responsiva";
import { dateCalendar } from "../../helpers/datetime";
//icons
import { FaArrowLeft } from "react-icons/fa";
//hooks
import { useNavigate, useParams } from "react-router-dom";
import { useGetOneResponsive } from "../../Hooks/Responsivas";
import { useInfoUser } from "../../Hooks/Users";

function ViewResponsive() {

    const { idResponsiva } = useParams()
    const { loading, data } = useGetOneResponsive(idResponsiva)

    const { created_at, llaves, metadata, users, responsable } = data[0] || {};
    const { nombre, apellido } = users || {};

    const navigate = useNavigate();

    const { infoUser: nombreResponsable } = useInfoUser(responsable)
    const nombreEntrega = users ? `${nombre} ${apellido}` : 'no disponible';

    const dataResponsive = { created_at, llaves, nombreResponsable, nombreEntrega }

    const backToInit = () => {
        navigate('/')
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center min-h-screen min-w-screen bg-white">

                <Button
                    className=" absolute left-2 top-2 text-white"
                    onPress={backToInit}
                    color="primary"
                    isIconOnly>
                    <FaArrowLeft />
                </Button>

                <div className="flex flex-col p-2 h-[90vh] w-5/6 items-center input-light-base shadow-lg gap-2">
                    <div className=" flex flex-row justify-end w-5/6 ">
                        <DownloadResponsive dataResponsive={dataResponsive} />
                    </div>

                    {loading &&
                        <div className="flex flex-col items-center justify-center  h-full w-full bg-gray-200 ">
                            <Spinner size='lg' label="cargando responsiva..." color="primary" />
                        </div>}

                    {!loading &&
                        <PDFViewer
                            style={{ width: '100%', height: '100%' }}>
                            <ResponsivaTaller dataResponsive={dataResponsive} />
                        </PDFViewer>}
                </div>
            </div>

        </>
    );
}

export { ViewResponsive };