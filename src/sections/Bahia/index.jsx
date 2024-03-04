import { useState, useEffect } from "react";
import { useLayout } from "../../Hooks/Layout";
import { Card } from "@nextui-org/react";
import { Columna } from "../Columna";

function Bahia({ bahia, stateDefault }) {

    const { stateLayout } = useLayout(stateDefault, bahia);

    const [columns, setColumns] = useState([])

    useEffect(() => {
        // Extraer columnas únicas
        const columnasUnicas = stateLayout.reduce((columnas, objeto) => {
            if (!columnas.includes(objeto.columna)) {
                columnas.push(objeto.columna);
            }
            return columnas;
        }, []);
        setColumns(columnasUnicas)
    }, [stateLayout])

    return (
        <>
            <Card className="max-w-[90vw] overflow-x-auto">
                <Card className="flex flex-row gap-1 overflow-x-auto">
                    {columns.map((columna) => (
                        <Columna
                            key={columna}
                            stateLayout={stateLayout}
                            column={columna}
                        />
                    ))}
                </Card>

            </Card>
        </>
    );
}

export { Bahia };
