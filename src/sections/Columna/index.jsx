import { Chip } from "@nextui-org/react"
import { Tracto } from "../Tracto"
import { useMemo } from "react"

export function Columna({ stateLayout, column, bloque }) {

    const filterColumn = useMemo(() => {
        return stateLayout.filter((element) => element.bloque === bloque && element.columna === column)
    }, [stateLayout])

    const rowsSimbols = ['A', 'B', 'C', 'D', 'E']

    return (

        <div className="flex flex-col gap-2 bg-gray-200 p-1 w-fit">
            {filterColumn.map((item, index) => (
                <div className='flex flex-row gap-2 items-end' key={index}>
                    {item.columna === '1' &&
                        <Chip size="sm" radius="sm" color="primary" className="fixed left-[3vw] text-white z-10 ">{rowsSimbols[index]}</Chip>
                    }
                    <Tracto item={item} index={index} />
                </div>
            ))}
        </div>

    )
}