import { supabase } from "../../supabase";
import { toast, Toaster } from "sonner";
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    Button,
    Input,
    Tooltip,
    Chip,
    Spinner,
    Select,
    SelectItem,
} from "@nextui-org/react";
//services
import { getAllRegistersActive } from "../../services/registros";
//icons
import { FaInfoCircle, FaSearch } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";
//helpers
import { dataFormat, tiempoTranscurrido, transformDateFilter } from "../../helpers/datetime";
//libraries
import * as XLSX from 'xlsx';
//hooks
import { useSearcher } from "../../Hooks/useSearcher";


export function TableReports() {

    const [registers, setRegisters] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [update, setUpdate] = useState(false);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState({ filterInit: '', filterEnd: '' })

    const initRef = useRef();
    const endRef = useRef();

    const { searchValue, handleKeyPress, dataFiltered, onChangeClear, mode } = useSearcher(registers, 'chasis');

    const dataDinamic = mode ? dataFiltered : registers;

    const filterRegisters = () => {
        try {
            const init = initRef.current?.value;
            const end = endRef.current?.value;

            if (!init || !end) {
                toast.warning('inserta una fecha de inicio y de fin')
            } else {
                const dateInit = transformDateFilter(init)
                const dateEnd = transformDateFilter(end)
                setFilter({ filterInit: dateInit, filterEnd: dateEnd })
            }

        } catch (error) {
            console.error(error)
        }
    }

    async function getRegisters() {
        try {
            setLoading(true)
            const { data } = await getAllRegistersActive();

            if (error) {
                const cache = localStorage.getItem('registros_reportes')
                if (cache != null) {
                    setRegisters(JSON.parse(cache))
                }
                setError(error)
                setLoading(false)
            }

            localStorage.setItem('registros_reportes', JSON.stringify(data))
            setRegisters(data)
            setLoading(false)

        } catch (error) {
            console.error(error)
        }
    }

    const changes = supabase.channel('schema-db-changes').on(
        'postgres_changes',
        {
            schema: 'public',
            event: '*',
            table: 'registros'
        },
        (payload) => {
            setUpdate(!update)
        }
    )
        .subscribe()

    useEffect(() => {
        getRegisters();
        return () => {
            // Limpiar suscripción cuando el componente se desmonta
            changes.unsubscribe();
        };

    }, [update]);

    //export xls
    const generateExcel = () => {

        const report = registers.map((register) => {
            return {
                chasis: register.chasis,
                checkIn: dataFormat(register),
                checkOut: register.checkOut != null ? dataFormat(register.checkOut) : 'En patio',
                estancia: tiempoTranscurrido(register.checkIn, register.checkOut),
                deuda: tiempoTranscurrido(register.checkIn, register.checkOut) * 40,
            }
        });

        const ws = XLSX.utils.json_to_sheet(report);
        const wb = XLSX.utils.book_new();

        const columnWidths = [
            { wpx: 70 }, // Ancho de la primera columna en píxeles
            { wpx: 150 }, // Ancho de la segunda columna en píxeles
            { wpx: 150 }, // Ancho de la tercera columna en píxeles
            { wpx: 70 }, // Ancho de la tercera columna en píxeles
            { wpx: 70 }, // Ancho de la tercera columna en píxeles

        ];
        ws['!cols'] = columnWidths;

        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'example.xlsx');
    };

    //RENDER COLUMNS
    const renderCell = useCallback(

        (register, columnKey) => {

            const cellValue = register[columnKey];

            const estancia = tiempoTranscurrido(register.checkIn, register.checkOut);

            const deuda = tiempoTranscurrido(register.checkIn, register.checkOut) * 40;

            switch (columnKey) {
                case "chasis":
                    return (
                        <div className="flex flex-col">
                            <p className="text-sm capitalize text-bold text-default-400">
                                {register.chasis}
                            </p>
                        </div>
                    );

                case "checkIn":
                    return (
                        <div className="flex flex-col">
                            <p className="text-sm capitalize text-bold text-default-400">
                                {cellValue != null ? dataFormat(cellValue) : 'Error en fecha'}
                            </p>
                        </div>
                    );

                case "checkOut":
                    return (
                        <div className="flex flex-col">
                            <p className="text-sm capitalize text-bold text-default-400">
                                {cellValue != null ? dataFormat(cellValue) : 'En patio'}
                            </p>
                        </div>
                    );

                case "estancia":
                    return (
                        <div className="flex flex-col">
                            <p className="text-sm text-bold text-default-400">
                                {`${estancia}  ${estancia > 1 ? ' días' : ' día'}`}
                            </p>
                        </div>
                    );

                case "deuda":
                    return (
                        <div className="flex flex-col">
                            <p className="text-sm text-bold text-default-400">
                                $ {deuda}
                            </p>
                        </div>
                    );

                case "actions":
                    return (
                        <div className="relative flex items-center gap-2">
                            <Tooltip color='default' content="ver checklist">
                                <span onClick={() => { }}
                                    className="text-lg cursor-pointer text-primary active:opacity-50"
                                >
                                    <FaInfoCircle className={`text-'primary'}`} />
                                </span>
                            </Tooltip>
                        </div>
                    );
                default:
                    return cellValue;
            }
        },
        [update]
    );

    const rowsPerPage = 20;
    const pages = Math.ceil(dataDinamic.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return dataDinamic.slice(start, end);
    }, [page, dataDinamic]);

    return (
        <>

            <Toaster richColors position="top-center" />

            <Table
                className="w-[90vw] max-w-[1035px]"
                aria-label="Example table with client side pagination"
                topContent={
                    <div className="flex flex-row items-center justify-between w-full gap-4 ">

                        <div className="flex flex-row items-center">
                            <Input
                                size="sm"
                                type="text"
                                ref={searchValue}
                                className="w-52 h-full"
                                placeholder="Buscar registros"
                                onKeyDown={handleKeyPress}
                                onChange={onChangeClear}
                                endContent={<FaSearch />}
                            />
                        </div>

                        <div className="flex flex-row items-center gap-2">
                            <Input
                                size="md"
                                type='date'
                                label='inicio'
                                className="w-[200px]"
                                labelPlacement='outside-left'
                                ref={initRef}

                            />


                            <Input
                                size="md"
                                type='date'
                                label='fin'
                                className="w-[200px]"
                                labelPlacement='outside-left'
                                ref={endRef}
                            />

                            <Button
                                size="sm"
                                color="primary"
                                className="text-white font-semibold "
                                onPress={filterRegisters}>
                                filtrar
                            </Button>


                            <Button
                                size="sm"
                                className="text-white bg-excel font-semibold"
                                endContent={<SiMicrosoftexcel />}
                                onPress={() => generateExcel()}>
                                Exportar Excel
                            </Button>
                        </div>

                    </div>
                }
                bottomContent={
                    <div className="flex w-full justify-center text-white">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }
                classNames={{
                    wrapper: "min-h-[222px]",
                }}
            >
                <TableHeader>
                    <TableColumn key="chasis">CHASIS</TableColumn>
                    <TableColumn key="checkIn">CHECKIN</TableColumn>
                    <TableColumn key="checkOut">CHECKOUT</TableColumn>
                    <TableColumn key="estancia">ESTANCIA</TableColumn>
                    <TableColumn key="deuda">DEUDA</TableColumn>
                    <TableColumn key="actions">ACTIONS</TableColumn>
                </TableHeader>
                <TableBody
                    isLoading={loading}
                    loadingContent={<Spinner />}
                    emptyContent={"Sin registros"}
                    items={items}>
                    {(item) => (
                        <TableRow key={item.name}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>


        </>
    );
}

