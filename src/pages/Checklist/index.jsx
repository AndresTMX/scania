import { useState } from "react";
import { toast, Toaster } from "sonner";
import { Button, Input, Spinner } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useChecklist } from "../../Hooks/Checklist";
import { plantillaChecklist } from "../../helpers/checklist";
import { ItemQuestionsDinamic } from "../../components/ItemQuestionDinamic";
//icons
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { TbClockQuestion } from "react-icons/tb";
import { MdChecklistRtl } from "react-icons/md";



function Checklist() {

    const { id, chasis, tipo } = useParams()

    const [step, setStep] = useState(1)

    const { routerChecklist } = useChecklist();

    const dataUser = JSON.parse(localStorage.getItem('scania-session'))

    const [revisionGeneral, setRevisionGeneral] = useState(plantillaChecklist.revisionGeneral)

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

    const [finales, setFinales] = useState(plantillaChecklist.finales)

    const [salida, setSalida] = useState({ user_salida_id: dataUser.user.id, destino: '', })

    const [loading, setLoading] = useState(null)

    const navigate = useNavigate();

    const updateRevision = (e, state, callback) => {

        e.preventDefault()

        const key = tipo === 'entrada' ? 'inputvalue' : 'outputvalue';

        const empytValues = state.filter((question) => question[key] === '' && question.required === true);

        const emptyImages = state.filter((question) => question.type && question.type === 'image' && question.preview === "");

        const badResponseEmptyImage = state.filter((question) => question.correct && question[key] != question.correct && question.preview === "");

        if (empytValues.length > 0) {
            toast.error('Responde todas las preguntas para continuar')
        } else if (emptyImages.length > 0 || badResponseEmptyImage.length > 0) {
            toast.warning('Carga evidencias para continuar')
        } else {
            callback()
        }

    }

    const reduceRevision = async () => {

        let newChecklist;

        const checklistEntrada = {
            revisionGeneral: revisionGeneral,
            revisionLlaves: juegoLlaves,
            revisionFrontal: revisionFrontal,
            revisionFluidos: nivelFluidos,
            revisionDerecho: revisionDerecho,
            revisionTrasera: revisionTrasera,
            revisionIzquierda: revisionIzquierda,
            revisionCabina: revisionCabina,
            revisionAccesorios: revisionAccesorios,
            revisionDatos: reguardoDatos,
            revisionBaterias: revisionBaterias,
            detalles: finales,
        }

        newChecklist = { document: checklistEntrada, tracto_id: id, tipo: 'scania' }

        setLoading(true)
        const { error } = await routerChecklist(tipo, newChecklist, salida);

        if (error === null) {
            setLoading(false)
            toast.success('Checklist guardado')
            setTimeout(() => {
                navigate('/')
            }, 1000)
        } else {
            setLoading(false)
            toast.error(`Error al subir el checklist: ${error.message}`)
            setTimeout(() => {
                navigate('/')
            }, 1000)
        }

    }

    const backToInit = () => {
        navigate('/')
    }

    const checkAll = (state, updater) => {

        try {
            const copyState = [...state];

            const keyUpdate = tipo === 'entrada' ? 'inputvalue' : 'outputvalue';

            const newState = copyState.map((question) => {

                const copyQuestion = { ...question }

                if (copyQuestion?.correct) {
                    copyQuestion[keyUpdate] = copyQuestion.correct
                }

                return { ...copyQuestion }
            })

            updater(newState)
        } catch (error) {
            toast.error(`error : ${error?.message}`)
        }

    }

    return (
        <>

            <Toaster richColors position="top-center" />

            {loading && <div className="fixed z-10 bg-black bg-opacity-[40%] flex flex-col justify-center items-center h-screen w-screen">
                <Spinner size="lg" />
            </div>}

            <section className="flex flex-col w-full gap-4 py-5 bg-body min-h-screen h-full items-center">

                <Button
                    size="sm"
                    className="text-white absolute left-10sm: left-5 top-2"
                    onPress={backToInit}
                    color="primary"
                    isIconOnly>
                    <FaArrowLeft />
                </Button>

                <div className="flex flex-col gap-5 py-10 justify-center lg:w-[500px] md:w-5/6 sm:w-5/6 max-sm:max-w-[90vw]">

                    <strong className="text-lg text-center text-secondary">Checklist de {tipo} de chasis {chasis}</strong>

                    <div className="flex flex-col w-full gap-5 xl:px-5 md:px-2 sm:px-2 ">

                        {/* Revision general */}
                        {step === 1 && <form onSubmit={(e) => updateRevision(e, revisionGeneral, () => setStep(2))}
                            className="flex flex-col gap-5 w-full shadow-md bg-white p-5">

                            <div className="flex flex-row justify-between ">
                                <strong>Revision general</strong>

                                <Button
                                    isIconOnly
                                    size="sm"
                                    color="primary"
                                    className="text-white text-lg"
                                    onPress={() => checkAll(revisionGeneral, setRevisionGeneral)}
                                >
                                    <MdChecklistRtl />
                                </Button>
                            </div>

                            {revisionGeneral.map((element, index) => (
                                <ItemQuestionsDinamic
                                    item={element}
                                    index={index}
                                    updateState={setRevisionGeneral}
                                    state={revisionGeneral}
                                    typeChecklist={tipo}
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
                        {step === 2 && <form onSubmit={(e) => updateRevision(e, juegoLlaves, () => setStep(3))}
                            className="flex flex-col gap-5 w-full bg-white p-5  shadow-md">

                            <div className="flex flex-row justify-between ">
                                <strong>Revision de llaves</strong>


                            </div>

                            {juegoLlaves.map((element, index) => (
                                <ItemQuestionsDinamic
                                    item={element}
                                    index={index}
                                    state={juegoLlaves}
                                    updateState={setJuegoLlaves}
                                    typeChecklist={tipo}

                                />
                            ))}

                            <div className="flex flex-row items-center justify-between">
                                <Button
                                    onPress={() => setStep(step - 1)}
                                    className="text-white"
                                    color="warning"
                                    type="submit"
                                    isIconOnly
                                >
                                    <FaArrowLeft />
                                </Button>
                                <Button
                                    className="text-white"
                                    color="primary"
                                    type="submit"
                                >
                                    Siguiente
                                </Button>
                            </div>

                        </form>}

                        {/* Revision de frontal */}
                        {step === 3 && <form onSubmit={(e) => updateRevision(e, revisionFrontal, () => setStep(4))}
                            className="flex flex-col gap-5 w-full bg-white p-5 shadow-md">

                            <div className="flex flex-row justify-between ">
                                <strong>Revision frontal</strong>

                                <Button
                                    isIconOnly
                                    size="sm"
                                    color="primary"
                                    className="text-white text-lg"
                                    onPress={() => checkAll(revisionFrontal, setRevisionFrontal)}
                                >
                                    <MdChecklistRtl />
                                </Button>
                            </div>

                            {revisionFrontal.map((element, index) => (
                                <ItemQuestionsDinamic
                                    item={element}
                                    index={index}
                                    state={revisionFrontal}
                                    updateState={setRevisionFrontal}
                                    typeChecklist={tipo}
                                />
                            ))}

                            <div className="flex flex-row items-center justify-between">
                                <Button
                                    onPress={() => setStep(step - 1)}
                                    className="text-white"
                                    color="warning"
                                    type="submit"
                                    isIconOnly
                                >
                                    <FaArrowLeft />
                                </Button>
                                <Button
                                    className="text-white"
                                    color="primary"
                                    type="submit"
                                >
                                    Siguiente
                                </Button>
                            </div>

                        </form>}

                        {/* Revision de fluidos */}
                        {step === 4 && <form onSubmit={(e) => updateRevision(e, nivelFluidos, () => setStep(5))}
                            className="flex flex-col gap-5 w-full bg-white p-5 shadow-md">

                            <div className="flex flex-row justify-between ">
                                <strong>Revision de fluidos</strong>


                            </div>

                            {nivelFluidos.map((element, index) => (
                                <ItemQuestionsDinamic
                                    item={element}
                                    index={index}
                                    state={nivelFluidos}
                                    updateState={setNivelFluidos}
                                    typeChecklist={tipo}
                                />
                            ))}

                            <div className="flex flex-row items-center justify-between">
                                <Button
                                    onPress={() => setStep(step - 1)}
                                    className="text-white"
                                    color="warning"
                                    type="submit"
                                    isIconOnly
                                >
                                    <FaArrowLeft />
                                </Button>
                                <Button
                                    className="text-white"
                                    color="primary"
                                    type="submit"
                                >
                                    Siguiente
                                </Button>
                            </div>

                        </form>}

                        {/* Revision de derecho */}
                        {step === 5 && <form onSubmit={(e) => updateRevision(e, revisionDerecho, () => setStep(6))}
                            className="flex flex-col gap-5 w-full bg-white p-5 shadow-md">

                            <div className="flex flex-row justify-between ">
                                <strong>Revision del costado derecho</strong>

                                <Button
                                    isIconOnly
                                    size="sm"
                                    color="primary"
                                    className="text-white text-lg"
                                    onPress={() => checkAll(revisionDerecho, setRevisionDerecho)}
                                >
                                    <MdChecklistRtl />
                                </Button>
                            </div>

                            {revisionDerecho.map((element, index) => (
                                <ItemQuestionsDinamic
                                    item={element}
                                    index={index}
                                    state={revisionDerecho}
                                    updateState={setRevisionDerecho}
                                    typeChecklist={tipo}
                                />
                            ))}

                            <div className="flex flex-row items-center justify-between">
                                <Button
                                    onPress={() => setStep(step - 1)}
                                    className="text-white"
                                    color="warning"
                                    type="submit"
                                    isIconOnly
                                >
                                    <FaArrowLeft />
                                </Button>
                                <Button
                                    className="text-white"
                                    color="primary"
                                    type="submit"
                                >
                                    Siguiente
                                </Button>
                            </div>

                        </form>}

                        {/* Revision  trasera */}
                        {step === 6 && <form onSubmit={(e) => updateRevision(e, revisionTrasera, () => setStep(7))}
                            className="flex flex-col gap-5 w-full bg-white p-5 shadow-md">

                            <div className="flex flex-row justify-between ">
                                <strong>Revision de parte trasera</strong>

                                <Button
                                    isIconOnly
                                    size="sm"
                                    color="primary"
                                    className="text-white text-lg"
                                    onPress={() => checkAll(revisionTrasera, setRevisionTrasera)}
                                >
                                    <MdChecklistRtl />
                                </Button>
                            </div>

                            {revisionTrasera.map((element, index) => (
                                <ItemQuestionsDinamic
                                    item={element}
                                    index={index}
                                    state={revisionTrasera}
                                    updateState={setRevisionTrasera}
                                    typeChecklist={tipo}
                                />
                            ))}

                            <div className="flex flex-row items-center justify-between">
                                <Button
                                    onPress={() => setStep(step - 1)}
                                    className="text-white"
                                    color="warning"
                                    type="submit"
                                    isIconOnly
                                >
                                    <FaArrowLeft />
                                </Button>
                                <Button
                                    className="text-white"
                                    color="primary"
                                    type="submit"
                                >
                                    Siguiente
                                </Button>
                            </div>

                        </form>}

                        {/* Revision  izquierda */}
                        {step === 7 && <form onSubmit={(e) => updateRevision(e, revisionIzquierda, () => setStep(8))}
                            className="flex flex-col gap-5 w-full bg-white p-5 shadow-md ">

                            <div className="flex flex-row justify-between ">
                                <strong>Revisión de la parte izquierda</strong>

                                <Button
                                    isIconOnly
                                    size="sm"
                                    color="primary"
                                    className="text-white text-lg"
                                    onPress={() => checkAll(revisionIzquierda, setRevisionIzquierda)}
                                >
                                    <MdChecklistRtl />
                                </Button>
                            </div>

                            {revisionIzquierda.map((element, index) => (
                                <ItemQuestionsDinamic
                                    item={element}
                                    index={index}
                                    state={revisionIzquierda}
                                    updateState={setRevisionIzquierda}
                                    typeChecklist={tipo}
                                />
                            ))}

                            <div className="flex flex-row items-center justify-between">
                                <Button
                                    onPress={() => setStep(step - 1)}
                                    className="text-white"
                                    color="warning"
                                    type="submit"
                                    isIconOnly
                                >
                                    <FaArrowLeft />
                                </Button>
                                <Button
                                    className="text-white"
                                    color="primary"
                                    type="submit"
                                >
                                    Siguiente
                                </Button>
                            </div>

                        </form>}

                        {/* Revision  cabina */}
                        {step === 8 && <form onSubmit={(e) => updateRevision(e, revisionCabina, () => setStep(9))}
                            className="flex flex-col gap-5 w-full bg-white p-5 shadow-md">

                            <div className="flex flex-row justify-between ">
                                <strong>Revision de cabina</strong>

                                <Button
                                    isIconOnly
                                    size="sm"
                                    color="primary"
                                    className="text-white text-lg"
                                    onPress={() => checkAll(revisionCabina, setRevisionCabina)}
                                >
                                    <MdChecklistRtl />
                                </Button>
                            </div>

                            {revisionCabina.map((element, index) => (
                                <ItemQuestionsDinamic
                                    item={element}
                                    index={index}
                                    state={revisionCabina}
                                    updateState={setRevisionCabina}
                                    typeChecklist={tipo}
                                />
                            ))}

                            <div className="flex flex-row items-center justify-between">
                                <Button
                                    onPress={() => setStep(step - 1)}
                                    className="text-white"
                                    color="warning"
                                    type="submit"
                                    isIconOnly
                                >
                                    <FaArrowLeft />
                                </Button>
                                <Button
                                    className="text-white"
                                    color="primary"
                                    type="submit"
                                >
                                    Siguiente
                                </Button>
                            </div>

                        </form>}

                        {/* Revision  accesorios */}
                        {step === 9 && <form onSubmit={(e) => updateRevision(e, revisionAccesorios, () => setStep(10))}
                            className="flex flex-col gap-5 w-full bg-white p-5 shadow-md">

                            <div className="flex flex-row justify-between ">
                                <strong>Revision de accesorios</strong>

                                <Button
                                    isIconOnly
                                    size="sm"
                                    color="primary"
                                    className="text-white text-lg"
                                    onPress={() => checkAll(revisionAccesorios, setRevisionesAccesorios)}
                                >
                                    <MdChecklistRtl />
                                </Button>
                            </div>

                            {revisionAccesorios.map((element, index) => (
                                <ItemQuestionsDinamic
                                    item={element}
                                    index={index}
                                    state={revisionAccesorios}
                                    updateState={setRevisionesAccesorios}
                                    typeChecklist={tipo}
                                />
                            ))}

                            <div className="flex flex-row items-center justify-between">
                                <Button
                                    onPress={() => setStep(step - 1)}
                                    className="text-white"
                                    color="warning"
                                    type="submit"
                                    isIconOnly
                                >
                                    <FaArrowLeft />
                                </Button>
                                <Button
                                    className="text-white"
                                    color="primary"
                                    type="submit"
                                >
                                    Siguiente
                                </Button>
                            </div>

                        </form>}

                        {/* Revision  datos */}
                        {step === 10 && <form onSubmit={(e) => updateRevision(e, reguardoDatos, () => setStep(11))}
                            className="flex flex-col gap-5 w-full bg-white p-5 shadow-md">

                            <div className="flex flex-row justify-between ">
                                <strong>Revision de datos</strong>

                                <Button
                                    isIconOnly
                                    size="sm"
                                    color="primary"
                                    className="text-white text-lg"
                                    onPress={() => checkAll(reguardoDatos, setReguardoDatos)}
                                >
                                    <MdChecklistRtl />
                                </Button>
                            </div>

                            {reguardoDatos.map((element, index) => (
                                <ItemQuestionsDinamic
                                    item={element}
                                    index={index}
                                    state={reguardoDatos}
                                    updateState={setReguardoDatos}
                                    typeChecklist={tipo}
                                />
                            ))}

                            <div className="flex flex-row items-center justify-between">
                                <Button
                                    onPress={() => setStep(step - 1)}
                                    className="text-white"
                                    color="warning"
                                    type="submit"
                                    isIconOnly
                                >
                                    <FaArrowLeft />
                                </Button>
                                <Button
                                    className="text-white"
                                    color="primary"
                                    type="submit"
                                >
                                    Siguiente
                                </Button>
                            </div>

                        </form>}

                        {/* Revision  baterias */}
                        {step === 11 && <form onSubmit={(e) => updateRevision(e, revisionBaterias, () => setStep(12))}
                            className="flex flex-col gap-5 w-full bg-white p-5 shadow-md">

                            <strong>Revision de baterias</strong>

                            {revisionBaterias.map((element, index) => (
                                <ItemQuestionsDinamic
                                    item={element}
                                    index={index}
                                    state={revisionBaterias}
                                    updateState={setRevisionBaterias}
                                    typeChecklist={tipo}
                                />
                            ))}

                            <div className="flex flex-row items-center justify-between">
                                <Button
                                    onPress={() => setStep(step - 1)}
                                    className="text-white"
                                    color="warning"
                                    type="submit"
                                    isIconOnly
                                >
                                    <FaArrowLeft />
                                </Button>
                                <Button
                                    className="text-white"
                                    color="primary"
                                    type="submit"
                                >
                                    Siguiente
                                </Button>
                            </div>

                        </form>}

                        {/* Detalles finales */}
                        {step === 12 && <form onSubmit={(e) => updateRevision(e, finales, () => reduceRevision())}
                            className="flex flex-col gap-5 w-full bg-white p-5 shadow-md">

                            <strong>Detalles finales</strong>

                            {finales.map((element, index) => (
                                <ItemQuestionsDinamic
                                    item={element}
                                    index={index}
                                    state={finales}
                                    updateState={setFinales}
                                    typeChecklist={tipo}
                                />
                            ))}

                            {tipo === 'salida' &&
                                <>
                                    <Input
                                        label='destino'
                                        value={salida.destino}
                                        onChange={(e) => setSalida({ ...salida, destino: e.target.value })} />
                                </>
                            }


                            <div className="flex flex-row items-center justify-between">
                                <Button
                                    onPress={() => setStep(step - 1)}
                                    className="text-white"
                                    color="warning"
                                    type="submit"
                                    isIconOnly
                                >
                                    <FaArrowLeft />
                                </Button>
                                <Button
                                    className="text-white"
                                    color="primary"
                                    type="submit"
                                >
                                    Siguiente
                                </Button>
                            </div>

                        </form>}

                    </div>
                </div>

            </section>

        </>
    );
}

export { Checklist };