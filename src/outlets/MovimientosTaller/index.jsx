import { Card, Button, Divider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Spinner } from "@nextui-org/react";
import { useParams, useNavigate } from "react-router-dom";
//services
import { getRegistersForId } from "../../services/movimientos_taller";
import { useEffect, useState, useCallback } from "react";
//icons
import { IoCloseOutline } from "react-icons/io5";
//helpers
import { dataFormat } from "../../helpers/datetime";

export function MovimientosTaller() {

    const { id } = useParams();

    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const navigate = useNavigate();

    async function GetData() {
        try {
            setLoading(true)

            const { error, data: registers } = await getRegistersForId(id);

            if (error) {
                setError(error)
                setLoading(false)
            }

            setData(registers)
            setLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        GetData()
    }, [id])

    const columns = [
        {
            key: "tipo",
            label: "TIPO",
        },
        {
            key: "user",
            label: "REGISTRADO POR",
        },
        {
            key: "time",
            label: "FECHA Y HORA",
        },
    ];

    const renderCell = useCallback((register, columnKey) => {

        const user = register.users.nombre + register.users.apellido;

        switch (columnKey) {
            case "tipo":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{register.tipo}</p>
                    </div>
                );
            case "user":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{user}</p>
                    </div>
                );
            case "time":
                return (
                    <div className="relative flex items-center gap-2">
                        <Chip size="sm" color='warning' >
                            {dataFormat(register.created_at)}
                        </Chip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <>
            <div className="absolute top-0 left-0 pt-[100px] flex flex-col items-center justify-top h-[100vh] w-[100vw] p-10 bg-black bg-opacity-50 z-10 " >

                <Card className="flex flex-col p-5 gap-2">

                    <div className="flex flex-row w-full gap-10 items-center justify-between">
                        <span>Movimientos de taller</span>

                        <Button
                            isIconOnly
                            size="sm"
                            color="danger"
                            onPress={() => navigate(`/`)}
                        >
                            <IoCloseOutline />
                        </Button>
                    </div>

                    <Divider />

                    <Table
                        aria-label="movimientos_taller"
                    >
                        <TableHeader columns={columns}>
                            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>
                        <TableBody
                            items={data}
                            isLoading={loading}
                            loadingContent={<Spinner />}
                            emptyContent={<p>...cargando</p>}
                        >
                            {(item) => (
                                <TableRow
                                    key={item.id}>

                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>


                </Card>

            </div>
        </>
    )
}
