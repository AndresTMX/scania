import { useState } from "react";
import { Toaster, toast } from "sonner";
import { plantillaChecklist } from "../../helpers/checklist";
import { ItemQuestionsDinamic } from "../../components/ItemQuestionDinamic";
import { Button } from "@nextui-org/react";
import { useParams } from "react-router-dom";

function Checklist() {

    const { id , chasis} = useParams()

    const [step, setStep] = useState(1)

    const [revisionGeneral, setRevisionGeneral] = useState(plantillaChecklist.revisionGeneral)
    console.log("🚀 ~ Checklist ~ revisionGeneral:", revisionGeneral)

    const [juegoLlaves, setJuegoLlaves] = useState(plantillaChecklist.juegosLlaves)

    const [revisionFrontal, setRevisionFrontal] = useState(plantillaChecklist.revisionFrontal)

    const [nivelFluidos, setNivelFluidos] = useState(plantillaChecklist.nivelesFluidos)

    const [revisionDerecho, setRevisionDerecho] = useState(plantillaChecklist.revisionDerecho)

    const [revisionTrasera, setRevisionTrasera] = useState(plantillaChecklist.revisionTrasera)

    const [revisionIzquierda, setRevisionIzquierda] = useState(plantillaChecklist.revisionIzquierda)

    const [revisionCabina, setRevisionCabina] = useState(plantillaChecklist.revisionCabina)

    const [revisionAccesorios, setRevisionesAccesorios] = useState(plantillaChecklist.revisionAccesorios)

    const [reguardoDatos, setReguardoDatos] = useState(plantillaChecklist.reguardoDatos)

    const [revisionBaterias, setRevisionBaterias] = useState(plantillaChecklist.revisionBaterias)

    const updateRevision = (e, state, callback) => {
        e.preventDefault()

        const empytValues = state.filter((question) => question.value === '');
        console.log("🚀 ~ updateRevision ~ empytValues:", empytValues)

        if (empytValues.length > 0) {
            toast.error('Responde todas las preguntas para continuar')
        } else {
            callback
        }

    }

    return (
        <>

            <div className="flex flex-col gap-4 items-center py-5 w-full h-screen bg-body">
                <section className="flex flex-col gap-4 py-5 w-full h-full overflow-y-auto max-w-[500px] ">

                    <strong className="text-secondary text-lg text-center ">Checklist de entrada de chasis {chasis}</strong>
                    <span className="text-sm text-gray-400 text-center">ID register: {id}</span>

                    <div onSubmit={updateRevision} className="flex flex-col overflow-y-auto gap-5 xl:p-5 md:p-2 sm:p-1">

                        {/* Revision general */}
                        {step === 1 && <form onSubmit={(e) => updateRevision(e, revisionGeneral, () => console.log('callback'))} className="flex flex-col gap-5 w-full lg:min-w-[400px] bg-white p-5">

                            <strong>Revision general</strong>

                            {revisionGeneral.map((element, index) => (
                                <ItemQuestionsDinamic
                                    item={element}
                                    index={index}
                                    updateState={setRevisionGeneral}
                                    state={revisionGeneral}
                                />
                            ))}

                            <Button
                                className="text-white"
                                color="primary"
                                type="submit"
                            >
                                Siguiente
                            </Button>


                        </form>}

                        {/* Revision de llaves */}
                        {step === 2 && <div className="flex flex-col gap-5 w-full lg:min-w-[400px] bg-white p-5">

                            <strong>Revision de juego de llaves</strong>

                            {juegoLlaves.map((element, index) => (
                                <ItemQuestionsDinamic
                                    item={element}
                                    index={index}
                                    state={juegoLlaves}
                                />
                            ))}

                        </div>}

                        {/* Revision de frontal */}
                        {step === 3 && <div className="flex flex-col gap-5 w-full lg:min-w-[400px] bg-white p-5">

                            <strong>Revision frontal</strong>

                            {revisionFrontal.map((element, index) => (
                                <ItemQuestionsDinamic
                                    item={element}
                                    index={index}
                                    state={revisionFrontal}
                                />
                            ))}

                        </div>}

                        {/* Revision de fluidos */}
                        {step === 4 && <div className="flex flex-col gap-5 w-full lg:min-w-[400px] bg-white p-5">

                            <strong>Revision de fluidos</strong>

                            {nivelFluidos.map((element, index) => (
                                <ItemQuestionsDinamic
                                    item={element}
                                    index={index}
                                    state={nivelFluidos}
                                />
                            ))}

                        </div>}

                        {/* Revision de derecho */}
                        {step === 5 && <div className="flex flex-col gap-5 w-full lg:min-w-[400px] bg-white p-5">

                            <strong>Revision del costado derecho</strong>

                            {revisionDerecho.map((element, index) => (
                                <ItemQuestionsDinamic
                                    item={element}
                                    index={index}
                                    state={revisionDerecho}
                                />
                            ))}

                        </div>}

                        {/* Revision  trasera */}
                        {step === 6 && <div className="flex flex-col gap-5 w-full lg:min-w-[400px] bg-white p-5">

                            <strong>Revision de parte trasera</strong>

                            {revisionTrasera.map((element, index) => (
                                <ItemQuestionsDinamic
                                    item={element}
                                    index={index}
                                    state={revisionTrasera}
                                />
                            ))}

                        </div>}

                        {/* Revision  izquierda */}
                        {step === 7 && <div className="flex flex-col gap-5 w-full lg:min-w-[400px] bg-white p-5">

                            <strong>Revision de parte izquierda</strong>

                            {revisionIzquierda.map((element, index) => (
                                <ItemQuestionsDinamic
                                    item={element}
                                    index={index}
                                    state={revisionIzquierda}
                                />
                            ))}

                        </div>}

                        {/* Revision  cabina */}
                        {step === 8 && <div className="flex flex-col gap-5 w-full lg:min-w-[400px] bg-white p-5">

                            <strong>Revision de cabina</strong>

                            {revisionCabina.map((element, index) => (
                                <ItemQuestionsDinamic
                                    item={element}
                                    index={index}
                                    state={revisionCabina}
                                />
                            ))}

                        </div>}

                        {/* Revision  accesorios */}
                        {step === 9 && <div className="flex flex-col gap-5 w-full lg:min-w-[400px] bg-white p-5">

                            <strong>Revision de accesorios</strong>

                            {revisionAccesorios.map((element, index) => (
                                <ItemQuestionsDinamic
                                    item={element}
                                    index={index}
                                    state={revisionAccesorios}
                                />
                            ))}

                        </div>}


                        {/* Revision  accesorios */}
                        {step === 10 && <div className="flex flex-col gap-5 w-full lg:min-w-[400px] bg-white p-5">

                            <strong>Revision de accesorios</strong>

                            {reguardoDatos.map((element, index) => (
                                <ItemQuestionsDinamic
                                    item={element}
                                    index={index}
                                    state={reguardoDatos}
                                />
                            ))}

                        </div>}

                        {/* Revision  baterias */}
                        {step === 11 && <div className="flex flex-col gap-5 w-full lg:min-w-[400px] bg-white p-5">

                            <strong>Revision de baterias</strong>

                            {revisionBaterias.map((element, index) => (
                                <ItemQuestionsDinamic
                                    item={element}
                                    index={index}
                                    state={revisionBaterias}
                                />
                            ))}

                        </div>}

                    </div>

                </section>
            </div>

        </>
    );
}

export { Checklist };