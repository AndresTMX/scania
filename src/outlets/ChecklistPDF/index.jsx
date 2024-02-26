import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { PDFViewer } from "@react-pdf/renderer";
import { useChecklist } from "../../Hooks/Checklist";
import { useParams, useNavigate } from "react-router-dom";
import { RevisionScania, DowloadScania } from "../../PDF/plantillas/RevisionScania";
import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";


function ChecklistPDF() {

    const { getOneInputChecklist, checklist, loading } = useChecklist();

    const { id } = useParams();

    useEffect(() => {
        getOneInputChecklist(id)
    }, [id])

    const navigate = useNavigate()

    const backToInit = () => {
        navigate('/')
    }


    return (
        <>

            <section className="flex flex-col h-screen w-screen p-4 bg-body">

                <Button
                    className="text-white absolute ml-2 left-0"
                    onPress={backToInit}
                    color="primary"
                    isIconOnly>
                    <FaArrowLeft />
                </Button>

                <div className="flex flex-col mt-10 w-full h-full items-center">
                    <Card className="flex flex-col h-full w-5/6">
                        <CardHeader className="flex flex-col items-center">
                            <div className="flex flex-row w-5/6 justify-between items-center">
                                <strong>Checklist Scania</strong>

                                <DowloadScania />
                            </div>
                        </CardHeader>
                        <CardBody className="flex flex-col items-center">
                            <PDFViewer
                                style={{ width: '90%', height: '90%' }}
                            >
                                <RevisionScania checklist={checklist}/>
                            </PDFViewer>
                        </CardBody>
                    </Card>
                </div>
            </section>

        </>
    );
}

export { ChecklistPDF };