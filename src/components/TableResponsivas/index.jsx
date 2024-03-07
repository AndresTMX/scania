import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button, Input, Tooltip, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
//hooks
import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect, useCallback } from "react";
//libreries
import { Toaster } from "sonner";
//icons
import { FaSearch } from "react-icons/fa";
import { supabase } from "../../supabase";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { FaRegImages } from "react-icons/fa6";
//helpers
import { dataFormat } from "../../helpers/datetime";

function TableResponsives({ onOpen }) {

    const [update, setUpdate] = useState(false);
    const [page, setPage] = useState(1);

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(null)

    const navigate = useNavigate()


    const LinkToResponsive = (register) => {
        const registerString = JSON.stringify(register);
        navigate(`responsivas/${encodeURIComponent(registerString)}`)
    }

    async function getAllResponsives() {
        try {
            const { error, data } = await supabase
                .from('responsivas')
                .select(`*, users(*)`)

            if (error) {
                throw new Error(`Error al obtener responsivas, error: ${error.message}`)
            }

            setData(data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    const changes = supabase.channel('schema-db-changes').on(
        'postgres_changes',
        {
            schema: 'public',
            event: '*',
            table: 'responsivas'
        },
        (payload) => {
            setUpdate(!update)
        }
    )
        .subscribe()

    useEffect(() => {
        getAllResponsives();
        return () => {
            // Limpiar suscripción cuando el componente se desmonta
            changes.unsubscribe();
        };

    }, [update]);

    //RENDER COLUMNS
    const renderCell = useCallback(

        (register, columnKey) => {

            const cellValue = register[columnKey];

            const creador = register.users.nombre + register.users?.apellido;

            const metadata = encodeURIComponent(JSON.stringify(register.metadata? register.metadata: []))

            switch (columnKey) {
                case "fecha":
                    return (
                        <div className="flex flex-col">
                            <p className="text-sm capitalize text-bold text-default-400">
                                {dataFormat(register.created_at) || 'Error en fecha'}
                            </p>
                        </div>
                    );
                case "entrego":
                    return (
                        <div className="flex flex-col">
                            <p className="text-sm capitalize text-bold">{creador}</p>
                        </div>
                    );
                case "responsable":
                    return (
                        <div className="flex flex-col">
                            <p className="text-sm capitalize text-bold text-default-400">
                                {register.responsable}
                            </p>
                        </div>
                    );

                case "comentarios":
                    return (
                        <div className="flex flex-col">
                            <Popover placement='right-start'>
                                <PopoverTrigger>
                                    <Button
                                        size='sm'
                                        color="transparent"
                                    >
                                        <p className="text-sm truncate max-w-[80px] text-default-400">{register.comentarios}</p>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div className="px-1 py-2 max-w-[200px]">
                                        {<p>{register.comentarios}</p>}
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    );

                case "imagenes":
                    return (
                        <div className="flex flex-col">
                            <Button
                                isIconOnly
                                color="transparent"
                                className="text-primary"
                                onClick={() => navigate(`/responsiva/${metadata}`)}
                            >
                                <FaRegImages />
                            </Button>
                        </div>
                    );


                case "actions":
                    return (
                        <div className="relative flex items-center gap-2">
                            <Tooltip color='default' content="ver">
                                <span onClick={() => LinkToResponsive(register)}
                                    className="text-lg cursor-pointer text-primary active:opacity-50"
                                >
                                    <HiOutlineClipboardDocumentList />
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

    const rowsPerPage = 5;
    const pages = Math.ceil(data.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return data.slice(start, end);
    }, [page, data]);

    return (
        <>
            <Toaster richColors position="top-center" />

            <Table
                className="min-w-[720px]"
                aria-label="Example table with client side pagination"
                topContent={
                    <div className="flex flex-row items-center w-full justify-start gap-4 ">

                        <Input
                            className="w-52"
                            size="sm"
                            type="text"
                            placeholder="Buscar registros"
                            endContent={<FaSearch />}
                        />

                        <Button
                            size="sm"
                            className="bg-primary text-white font-semibold"
                            onPress={onOpen}>
                            Nueva responsiva
                        </Button>

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
                    <TableColumn key="fecha">FECHA</TableColumn>
                    <TableColumn key="entrego">ENTREGO</TableColumn>
                    <TableColumn key="responsable">RESPONSABLE</TableColumn>
                    <TableColumn key="comentarios">COMENTARIOS</TableColumn>
                    <TableColumn key="imagenes">IMAGENES</TableColumn>
                    <TableColumn key="actions">ACTIONS</TableColumn>
                </TableHeader>
                <TableBody
                    emptyContent={"Sin responsivas registradas"}
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

export { TableResponsives };