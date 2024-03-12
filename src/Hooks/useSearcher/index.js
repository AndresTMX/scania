import { useState, useRef } from "react";
import { toast } from "sonner";

export function useSearcher(data, keySearch,) {

    const [dataFiltered, setDataFilter] = useState([])
    const [mode, setMode] = useState(false)

    const searchValue = useRef();

    function SearchInData() {
        try {

            const newData = new Map();
            const resultados = []


            data.forEach(element => {
                newData.set(element[keySearch], element)
            });

            for (const [clave, valor] of newData) {
                if (clave.includes(searchValue.current.value)) {
                    resultados.push(newData.get(clave))
                }
            }

            setDataFilter(resultados)
            setMode(true)

        } catch (error) {
            toast.error('error en busqueda')
            console.error(error)
        }
    }

    function handleKeyPress(e) {
        try {
            if (e.key === 'Enter') {
                SearchInData()
            }

        } catch (error) {
            toast.error('error en busqueda')
        }
    }

    function onChangeClear() {
        try {
            searchValue.current.value?.length <= 1 ? setMode(false) : ''
        } catch (error) {
            console.error(error)
        }
    }

    return { searchValue, handleKeyPress, dataFiltered, onChangeClear, mode }





}