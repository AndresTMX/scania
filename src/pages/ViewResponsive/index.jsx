import { Button, Spinner } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";
import { DownloadResponsive, ResponsivaTaller } from "../../PDF/plantillas/responsiva";
import { useGetOneResponsive } from "../../Hooks/Responsivas";

function ViewResponsive() {

    const { idResponsiva } = useParams()
    const { loading, data } = useGetOneResponsive(idResponsiva)

    return (
        <>
            <div className="flex flex-col justify-center items-center min-h-screen min-w-screen bg-white">


                <div className="flex flex-col p-2 h-[90vh] w-5/6 items-center input-light-base shadow-lg gap-2">
                    <div className=" flex flex-row justify-end w-5/6 ">
                        <DownloadResponsive />
                    </div>

                    {loading &&
                        <div className="flex flex-col items-center justify-center  h-full w-full bg-gray-200 ">
                            <Spinner size='lg' label="cargando responsiva..." color="primary" />
                        </div>}

                    {!loading &&
                        <PDFViewer
                            style={{ width: '100%', height: '100%' }}>
                            <ResponsivaTaller />
                        </PDFViewer>}
                </div>
            </div>

        </>
    );
}

export { ViewResponsive };