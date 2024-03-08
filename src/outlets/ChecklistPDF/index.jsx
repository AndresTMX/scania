import { useEffect, useState } from "react";
import { useInfoUser } from "../../Hooks/Users";
import { PDFViewer } from "@react-pdf/renderer";
import { useChecklist } from "../../Hooks/Checklist";
import { useParams, useNavigate } from "react-router-dom";
import { RevisionScania, DowloadScania } from "../../PDF/plantillas/RevisionScania";
import { Card, CardHeader, CardBody, Button, Switch, Image } from "@nextui-org/react";
//icons
import { MdHomeFilled } from "react-icons/md";
import { BsGridFill } from "react-icons/bs";
import { MdOutlineWebAsset } from "react-icons/md";
import { GrDocumentPdf } from "react-icons/gr";
//helpers
import { dataFormat } from "../../helpers/datetime";


function ChecklistPDF() {

    const [mode, setMode] = useState(true)

    const { getOneInputChecklist, checklist, loading } = useChecklist();

    const { registros, document } = checklist || {};

    const { user_id, user_salida_id } = registros || {};

    const { infoUser: auditorRecepcion } = useInfoUser(user_id);
    const { infoUser: auditorLiberacion } = useInfoUser(user_id);

    const { id } = useParams();

    useEffect(() => {
        getOneInputChecklist(id)
    }, [id])

    const navigate = useNavigate()

    return (
        <>

            <section className="flex flex-col h-screen w-screen p-4 bg-body">

                <div className="flex flex-row items-center gap-2  absolute ml-2 right-5">
                    <Button
                        size="sm"
                        className="text-white "
                        onPress={() => navigate('/')}
                        color="primary"
                        isIconOnly>
                        <MdHomeFilled />
                    </Button>

                    <Button
                        size="sm"
                        className="text-white "
                        onPress={() => navigate('/croquis')}
                        color="primary"
                        isIconOnly>
                        <BsGridFill />
                    </Button>
                </div>

                <div className="flex flex-col mt-10 w-full h-full items-center">
                    <Card className="flex flex-col h-full w-[95vw]">
                        <CardHeader className="flex flex-col items-center">
                            <div className="flex flex-row w-5/6 justify-between items-center">
                                <div className="flex flex-row items-center gap-2">
                                    <Switch
                                        onValueChange={setMode}
                                        isSelected={mode}
                                        size="md"
                                        color="success"
                                        startContent={<GrDocumentPdf />}
                                        endContent={<MdOutlineWebAsset />}
                                    >
                                    </Switch>
                                    <strong>Checklist Scania</strong>
                                </div>
                                <DowloadScania />
                            </div>
                        </CardHeader>
                        <CardBody className="flex flex-col items-center">

                            {mode &&
                                <PDFViewer
                                    style={{ width: '90%', height: '90%' }}
                                >
                                    <RevisionScania
                                        checklist={checklist}
                                        auditorRecepcion={auditorRecepcion}
                                        auditorLiberacion={auditorLiberacion} />
                                </PDFViewer>}

                            {!mode &&
                                <ChecklistModeWeb
                                    checklist={checklist}
                                    auditorRecepcion={auditorRecepcion}
                                    auditorLiberacion={auditorLiberacion}
                                />
                            }

                        </CardBody>
                    </Card>
                </div>
            </section>

        </>
    );
}

export { ChecklistPDF };

function ChecklistModeWeb({ checklist, auditorRecepcion, auditorLiberacion }) {

    const { document, registros } = checklist || {};
    const { chasis, checkIn, checkOut, destino, llaves, modelo, origen, status, tipo, } = registros || {};

    const arraySections = Object.values(document);
    const arrayKeys = Object.keys(document);

    const [key, setKey] = useState(0);

    const titlesSections = {
        revisionGeneral: 'revisión general',
        revisionLlaves: 'revisión de llaves',
        revisionFrontal: 'revisión frontal',
        revisionFluidos: 'revisión de fluidos',
        revisionDerecho: 'revisión costado derecho',
        revisionTrasera: 'revisión parte trasera',
        revisionIzquierda: 'revisión costado izquierdo',
        revisionCabina: 'revisión de cabina',
        revisionAccesorios: 'revisión de accesorios',
        revisionDatos: 'revisión de datos',
        revisionBaterias: 'revisión de baterias',
        detalles: 'detalles '
    }

    return (
        <>

            <div className="flex flex-col gap-3 max-h-[70vh]">

                <div className="flex flex-row flex-wrap gap-2">
                    {arraySections.map((section, index) => (
                        <div
                            onClick={() => setKey(index)}
                            className={`flex flex-row p-2 input-light-base hover:cursor-pointer  ${index === key ? 'bg-primary text-white' : ''}`}>
                            <span>{titlesSections[arrayKeys[index]]}</span>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-2 p-2 overflow-auto">

                    {arraySections[key].map((question, index) => (
                        <div
                            className="flex flex-col p-2 gap-1 input-light-base"
                            key={question.question}>

                            {arrayKeys[key] === 'detalles' && index === 0 &&
                                <div className="flex flex-col gap-2">
                                    <p className="font-semibold">Ingreso</p>

                                    <div>
                                        <span className="text-xs text-gray-500">fecha de ingreso</span>
                                        <p>{dataFormat(checkIn)}</p>
                                    </div>

                                    <div>
                                        <span className="text-xs text-gray-500">origen</span>
                                        <p>{origen}</p>
                                    </div>

                                    <div>
                                        <span className="text-xs text-gray-500">chasis</span>
                                        <p>{chasis}</p>
                                    </div>

                                    <div>
                                        <span className="text-xs text-gray-500">número de llaves</span>
                                        <p>{llaves}</p>
                                    </div>

                                    <div>
                                        <span className="text-xs text-gray-500">tipo</span>
                                        <p>{tipo}</p>
                                    </div>

                                    <div>
                                        <span className="text-xs text-gray-500">módelo</span>
                                        <p>{modelo}</p>
                                    </div>

                                    <div>
                                        <span className="text-xs text-gray-500">fecha de salida</span>
                                        <p>{dataFormat(checkOut)}</p>
                                    </div>

                                    <div>
                                        <span className="text-xs text-gray-500">destino</span>
                                        <p>{destino}</p>
                                    </div>


                                </div>
                            }

                            <p className="font-semibold">{question.question}</p>

                            {question?.inputvalue && question.type != 'image' &&
                                <div>
                                    <span className="text-xs text-gray-500">entrada</span>
                                    <p>{question.inputvalue}</p>
                                </div>
                            }

                            {question?.outputvalue && question.type != 'image' &&
                                <div>
                                    <span className="text-xs text-gray-500">salida</span>
                                    <p>{question.outputvalue}</p>
                                </div>
                            }

                            {question?.inputImage &&
                                <div>
                                    <span className="text-xs text-gray-500">entrada</span>
                                    <Image src={question.inputImage} alt="image" width='200px' isZoomed />
                                </div>
                            }

                            {question?.inputImage &&
                                <div>
                                    <span className="text-xs text-gray-500">salida</span>
                                    <Image src={question.outputImage} alt="image" width='200px' isZoomed />
                                </div>
                            }


                            {question?.inputvalue && question.type === 'image' &&
                                <div>
                                    <span className="text-xs text-gray-500">entrada</span>
                                    <Image src={question.inputvalue} alt="image" width='200px' isZoomed />
                                </div>
                            }

                            {question?.outputvalue && question.type === 'image' &&
                                <div>
                                    <span className="text-xs text-gray-500">salida</span>
                                    <Image src={question.outputvalue} alt="image" width='200px' isZoomed />
                                </div>
                            }



                        </div>
                    ))}

                </div>

            </div>

        </>
    )
}