import { Card, } from "@nextui-org/react"
import { Tracto } from "../Tracto"
import { useMemo } from "react"

export function Columna({ stateLayout, column, bloque }) {

    const filterColumn = useMemo(() => {
        return stateLayout.filter((element) => element.bloque === bloque && element.columna === column)
    }, [stateLayout])

    return (

        <Card className="flex flex-col gap-2 bg-gray-200 p-1 min-w-[40px]">
            {filterColumn.map((item, index) => (
                <Tracto key={index} item={item} />
            ))}
        </Card>

    )
}