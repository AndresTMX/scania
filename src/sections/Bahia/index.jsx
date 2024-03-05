import { useMemo, useState } from "react";
import { useLayout } from "../../Hooks/Layout";
import { Card, Skeleton } from "@nextui-org/react";
import { Columna } from "../Columna";

function Bahia({ bahia, stateDefault }) {

    const { stateLayout } = useLayout(stateDefault, bahia);

    const [loading, setLoading] = useState(true)

    const columns = useMemo(() => {
        return stateLayout.reduce((columnas, objeto) => {
            if (!columnas.includes(objeto.columna)) {
                columnas.push(objeto.columna);
                setLoading(false)
            }
            return columnas;
        },  []);
    }, [stateLayout]);

    return (
        <Card className="max-w-[90vw] overflow-x-auto">

            {!loading && <div className="flex flex-row gap-1 overflow-x-auto">
                {columns.map((columna) => (
                    <Columna
                        key={columna}
                        stateLayout={stateLayout}
                        column={columna}
                    />
                ))}
            </div>}

            {loading &&
                <div className="flex flex-col gap-1 overflow-x-auto">
                    <Skeleton className="w-full rounded-sm h-[50px]" />
                    <Skeleton className="w-full rounded-sm h-[50px]" />
                    <Skeleton className="w-full rounded-sm h-[50px]" />
                    <Skeleton className="w-full rounded-sm h-[50px]" />
                    <Skeleton className="w-full rounded-sm h-[50px]" />
                    <Skeleton className="w-full rounded-sm h-[50px]" />
                    <Skeleton className="w-full rounded-sm h-[50px]" />
                </div>}

        </Card>
    );
}

export { Bahia };
