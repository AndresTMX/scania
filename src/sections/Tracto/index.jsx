import { Button, Modal, ModalBody, ModalHeader, ModalContent, useDisclosure, ModalFooter, Chip, Skeleton, Select, SelectItem, Input } from "@nextui-org/react"
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useEffect, useState, useRef } from "react";
//services
import { getRegistersForAssigned, assignedPositionInBahia, changueStatusTracto, clearPositionTracto } from "../../services/registros";
import { toast } from "sonner";
//helpers
import { dataFormat } from "../../helpers/datetime"
//icons
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function Tracto({ item, index }) {

    const [tractos, setTractos] = useState([]);
    const [loading, setLoading] = useState(null);
    const [selectTracto, selectedTracto] = useState({})
    const [searchValue, setSearchValue] = useState('')
    const [search, setSearch] = useState([])
    const optionStatus = ['resguardo', 'taller', 'entrega', 'faltantes', 'movimiento', 'especial']

    const statusRef = useRef();

    const navigate = useNavigate()

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const assigned = item?.status ? true : false;

    const getData = async () => {
        setLoading(true)
        setTractos([])
        const { error, data } = await getRegistersForAssigned();
        console.log('consulta')
        if (error) {
            toast.error(`Error al reuperar registros`)
            setLoading(false)
        } else {
            setTractos(data)
            setLoading(false)
        }

    }

    useEffect(() => {
        if (isOpen && !item?.status) {
            getData()
        }
    }, [isOpen])

    const changueStatus = async () => {

        const { error } = await changueStatusTracto(item.id, statusRef.current.value);

        if (error) {
            toast.error(`error al actualizar estatus de tracto ${item.chasis} `)
        } else {
            toast.success('status actualizado')
        }

    }

    const closeAndClear = () => {
        onOpenChange()
        selectedTracto({})
        setSearchValue('')
        setSearch([])
    }

    const routerColor = (statusLlaves) => {

        const routes = {
            undefined: 'bg-white text-black',
            resguardo: 'bg-llavesResguardo text-white',
            taller: 'bg-llavesTaller text-white',
            entrega: 'bg-llavesEntrega text-white',
            faltantes: 'bg-llavesFaltantes text-white',
            movimiento: 'bg-llavesMovimiento text-white',
            especial: 'bg-llavesEspecial text-white'
        }

        if (routes[statusLlaves]) {
            return routes[statusLlaves]
        }

    }

    const searcher = (e) => {

        if (e.key === "Enter") {
            const copyTractos = [...tractos]
            const filteredTractos = copyTractos.filter((tracto) => tracto.chasis.includes(searchValue));
            setSearch(filteredTractos);
        }

    }

    return (
        <>
            <div className="flex flex-col gap-2 items-center">

                {index === 0 &&
                    <Chip size="sm" color="primary" radius='sm' className="text-white text-center font-bold min-w-[60px]">{item.columna}</Chip>
                }

                <Chip
                    className={`${routerColor(item?.status_llaves)} :hover cursor-pointer hover:border-2 border-warning hover:scale-125 min-w-[60px]`}
                    size="sm"
                    onClick={onOpen}
                >
                    {assigned ? item.chasis : 'libre '}

                </Chip>

                <Modal className="absolute top-5 max-sm:max-w-[95vw]" isOpen={isOpen} onOpenChange={closeAndClear}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Tractocamion</ModalHeader>
                                <ModalBody>

                                    <Breadcrumbs>
                                        <BreadcrumbItem className="capitalize">Bahia {item.bahia}</BreadcrumbItem>
                                        <BreadcrumbItem className="capitalize">Fila {item.columna}</BreadcrumbItem>
                                        <BreadcrumbItem className="capitalize">Posición {item.fila}</BreadcrumbItem>
                                    </Breadcrumbs>

                                    {(item.status) &&
                                        <div className="flex flex-col gap-2 p-2 input-light-base text-sm">
                                            <span>Información del tractocamión</span>

                                            <Select
                                                size="sm"
                                                ref={statusRef}
                                                label="estatus de llaves"
                                                defaultSelectedKeys={[`${item.status_llaves}`]}
                                            >
                                                {optionStatus.map((option) => (
                                                    <SelectItem key={option} >{option}</SelectItem>
                                                ))}
                                            </Select>

                                            <div className="flex w-full gap-10 px-2">
                                                <div>
                                                    <strong>modelo</strong>
                                                    <p>{item.modelo}</p>
                                                </div>

                                                <div>
                                                    <strong>tipo</strong>
                                                    <p>{item.tipo}</p>
                                                </div>
                                            </div>

                                            <div className="px-2">
                                                <strong>entrada</strong>
                                                <p>{dataFormat(item.checkIn)}</p>
                                            </div>

                                        </div>}

                                    {!assigned && !loading &&
                                        <div className="flex flex-col gap-2">
                                            <p>Coincidencias </p>
                                            <Input
                                                size="sm"
                                                value={searchValue}
                                                onKeyDown={(e) => searcher(e)}
                                                onChange={(e) => setSearchValue(e.target.value)}
                                                placeholder="buscar por numero de chasis"
                                                endContent={<FaSearch />} />

                                            <div className="flex flex-row flex-wrap gap-2">
                                                {searchValue.length > 1 && search.length > 0 && search.map((tracto) => (
                                                    <Chip
                                                        key={tracto.id}
                                                        onClick={() => selectedTracto({ ...tracto, bahia: item.bahia, columna: item.columna, fila: item.fila, })}
                                                        color={selectTracto?.id === tracto.id ? 'primary' : 'default'}
                                                        className={`hover:cursor-pointer ${selectTracto?.id === tracto.id ? 'text-white' : ''}`}
                                                    >
                                                        {tracto.chasis}
                                                    </Chip>
                                                ))}

                                                {tractos.length > 0 && searchValue.length === 0 && tractos.map((tracto) => (
                                                    <Chip
                                                        key={tracto.id}
                                                        onClick={() => selectedTracto({ ...tracto, bahia: item.bahia, columna: item.columna, fila: item.fila, })}
                                                        color={selectTracto?.id === tracto.id ? 'primary' : 'default'}
                                                        className={`hover:cursor-pointer ${selectTracto?.id === tracto.id ? 'text-white' : ''}`}
                                                    >
                                                        {tracto.chasis}
                                                    </Chip>
                                                ))}

                                            </div>
                                        </div>}

                                    {!assigned && loading &&
                                        <div className="flex flex-col gap-2">
                                            <p>Tractos disponibles</p>
                                            <div className="flex flex-row items-center gap-2 ">
                                                <Skeleton className="h-6 rounded-full w-[75px]" />
                                                <Skeleton className="h-6 rounded-full w-[75px]" />
                                                <Skeleton className="h-6 rounded-full w-[75px]" />
                                            </div>
                                        </div>
                                    }

                                    {(selectTracto?.status) &&
                                        <div className="flex flex-col gap-2 p-2 input-light-base text-sm">
                                            <span>Información del tractocamión</span>

                                            <div className="flex w-full gap-10">
                                                <div>
                                                    <strong>modelo</strong>
                                                    <p>{selectTracto.modelo}</p>
                                                </div>

                                                <div>
                                                    <strong>tipo</strong>
                                                    <p>{selectTracto.tipo}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <strong>entrada</strong>
                                                <p>{dataFormat(selectTracto.checkIn)}</p>
                                            </div>

                                        </div>}

                                </ModalBody>
                                <ModalFooter>

                                    {assigned &&
                                        <Button
                                            size="sm"
                                            color="primary"
                                            variant='solid'
                                            className="text-white"
                                            onPress={() => navigate(`/document-checklist/${item.id}`)}>
                                            checklist
                                        </Button>}

                                    {assigned &&
                                        <Button
                                            size="sm"
                                            color="primary"
                                            variant='solid'
                                            className="text-white"
                                            onPress={changueStatus}>
                                            cambiar status
                                        </Button>}

                                    {assigned &&
                                        <Button
                                            size="sm"
                                            color="danger"
                                            variant='solid'
                                            onPress={async () => await clearPositionTracto(item.id)}>
                                            retirar tractocamión
                                        </Button>}

                                    {!assigned &&
                                        <Button
                                            size="sm"
                                            color="primary"
                                            className="text-white"
                                            onPress={async () => await assignedPositionInBahia(selectTracto)}
                                        >
                                            asignar posición
                                        </Button>}
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </>
    )
}
