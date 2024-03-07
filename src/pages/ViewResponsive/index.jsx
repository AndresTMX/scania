import { PDFViewer } from "@react-pdf/renderer";
import { Button, Spinner } from "@nextui-org/react";
import { DownloadResponsive, ResponsivaTaller } from "../../PDF/plantillas/responsiva";
//icons
import { FaArrowLeft } from "react-icons/fa";
//hooks
import { useNavigate, useParams } from "react-router-dom";

function ViewResponsive() {

    const navigate = useNavigate()

    const { register } = useParams()

    const registerInJson = register ? JSON.parse(decodeURIComponent(register)) : {};

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
                        <DownloadResponsive dataResponsive={registerInJson} />
                    </div>


                    {registerInJson &&
                        <PDFViewer
                            style={{ width: '100%', height: '100%' }}>
                            <ResponsivaTaller dataResponsive={registerInJson} />
                        </PDFViewer>}
                </div>
            </div>

        </>
    );
}

export { ViewResponsive };