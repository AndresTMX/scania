import { useId } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { Checkbox, CheckboxGroup, Input, Select, SelectItem, Textarea, Button, Tooltip } from "@nextui-org/react";

function ItemQuestionsDinamic({ item, index, state, updateState }) {

    const typeItem = (item) => {
        const typeArray = Array.isArray(item?.options);

        if (!typeArray) {
            return 'input'
        }

        if (typeArray && item.options.length >= 3) {
            return 'select'
        }

        if (typeArray && item.options.length === 2) {
            return 'checkbox'
        }

        if (!typeArray && !item.options) {
            return 'textarea'
        }

        return 'empty'
    }

    const render = typeItem(item)

    return (
        <>

            {render === 'input' && <DinamicInput item={item} index={index} state={state} updateState={updateState} />}

            {render === 'select' && <DinamicSelect item={item} index={index} state={state} updateState={updateState} />}

            {render === 'checkbox' && <DinamicCheckbox item={item} index={index} state={state} updateState={updateState} />}

            {render === 'textarea' && <DinamicTextArea item={item} index={index} state={state} updateState={updateState} />}

        </>
    );
}

export { ItemQuestionsDinamic };

function DinamicCheckbox({ item, index: indexQuestion, state, updateState }) {

    const { options, value, question } = item;

    return (
        <div className="flex flex-col gap-1"
        id={`id_${question.trim()}`}

        >

            <p>{question}</p>

            <Checkbox
                key={options[0]}
                onValueChange={() => OnChangeDinamic(options[0], 'value', indexQuestion, state, updateState)}
                color="primary"
                value={value === options[0]? true:false}
            >
                {options[0]}
            </Checkbox>


            <Checkbox
                key={options[1]}
                onValueChange={() => OnChangeDinamic(options[1], 'value', indexQuestion, state, updateState)}
                color="primary"
                value={value === options[1]? true:false}
            >
                {options[1]}
            </Checkbox>

            <div className="flex flex-row items-center justify-end p-1">
                <label label htmlFor={`image_${question}`}>
                    <input id={`image_${question}`} className="hidden" type='file' accept='image/*' name={`image_${question}`} />
                    <Tooltip content="agrega imagenes" className="bg-danger text-white">
                        <span className="text-lg cursor-pointer text-danger active:opacity-50">
                            <TbPhotoPlus />
                        </span>
                    </Tooltip>
                </label>

            </div>
        </div>
    )
}

function DinamicInput({ item, index: indexQuestion, state, updateState }) {

    const { value, question } = item;

    return (
        <Input
            required
            className="shadow-md rounded-md"
            id={`id_${question.trim()}`}
            name={question}
            label={question}
            value={value}
            onChange={(e) => OnChangeDinamic(e.target.value, 'value', indexQuestion, state, updateState)}
        />
    )
}

function DinamicSelect({ item }) {

    const { value, question, options } = item;

    return (

        <Select
            className="max-w-md"
            name={question}
            label={question}
            required
        >
            {options.map((element, index) => (
                <SelectItem
                    key={element} value={element}
                >
                    {element}
                </SelectItem>
            ))}
        </Select>

    )
}

function DinamicTextArea({ item }) {

    const { value, question } = item;

    return (
        <>
            <Textarea
                // className="shadow-md rounded-md max-w-xs"
                label={question}
                placeholder={'Escribe tus comentarios'}
            />
        </>
    )
}

export const OnChangeDinamic = (newValue, key, index, state, updateState) => {
    try {

        const copyState = [...state];

        copyState[index] = {
            ...copyState[index], // Copia el objeto en esa posición del array
            [key]: newValue // Actualiza el valor de la clave (key)
        };

        updateState(copyState)

    } catch (error) {
        console.error(error)
    }
}

export const OnCheckDinamic = (newValue, key, key2, index, state, updateState) => {
    try {

        const copyState = [...state];

        copyState[index] = {
            ...copyState[index],
            [key]: newValue ,
            [key2]: newValue 
        };

        updateState(copyState)

    } catch (error) {
        console.error(error)
    }
}