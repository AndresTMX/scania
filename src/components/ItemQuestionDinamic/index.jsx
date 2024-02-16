import { TbPhotoPlus } from "react-icons/tb";
import { Checkbox, Input, Select, SelectItem, Textarea, Tooltip } from "@nextui-org/react";

function ItemQuestionsDinamic({ item, index, state, updateState, typeChecklist }) {

    const typeItem = (item) => {
        const typeArray = Array.isArray(item?.options);

        if (!typeArray && item.question != 'observaciones') {
            return 'input'
        }

        if (!typeArray && item.question === 'observaciones') {
            return 'textarea'
        }

        if (typeArray && item.options.length >= 3) {
            return 'select'
        }

        if (typeArray && item.options.length === 2) {
            return 'checkbox'
        }

        return 'empty'
    }

    const render = typeItem(item)

    return (
        <>

            {render === 'input' && <DinamicInput item={item} index={index} state={state} updateState={updateState} typeChecklist={typeChecklist} />}

            {render === 'select' && <DinamicSelect item={item} index={index} state={state} updateState={updateState} typeChecklist={typeChecklist} />}

            {render === 'checkbox' && <DinamicCheckbox item={item} index={index} state={state} updateState={updateState} typeChecklist={typeChecklist} />}

            {render === 'textarea' && <DinamicTextArea item={item} index={index} state={state} updateState={updateState} typeChecklist={typeChecklist} />}

        </>
    );
}

export { ItemQuestionsDinamic };

function DinamicCheckbox({ item, index: indexQuestion, state, updateState, typeChecklist }) {

    const { options, inputvalue, outputvalue, question } = item;

    const keyValue = typeChecklist === 'entrada'? 'inputvalue': 'outputvalue';
    const dinamicValue = typeChecklist === 'entrada'? inputvalue: outputvalue;


    return (
        <div className="flex flex-col gap-1"
            id={`id_${question.trim()}`}

        >

            <p>{question}</p>

            <Checkbox
                key={options[0]}
                onValueChange={() => OnChangeDinamic(options[0], keyValue, indexQuestion, state, updateState)}
                color="primary"
                value={dinamicValue === options[0] ? true : false}
            >
                {options[0]}
            </Checkbox>


            <Checkbox
                key={options[1]}
                onValueChange={() => OnChangeDinamic(options[1], keyValue, indexQuestion, state, updateState)}
                color="primary"
                value={dinamicValue === options[1] ? true : false}
            >
                {options[1]}
            </Checkbox>

            <div className="flex flex-row items-center justify-end p-1">
                <label label htmlFor={`image_${question}`}>
                    <input id={`image_${question}`} className="hidden" type='file' accept='image/*' name={`image_${question}`} />
                    <Tooltip content="agrega imagenes" className="text-white bg-danger">
                        <span className="text-lg cursor-pointer text-danger active:opacity-50">
                            <TbPhotoPlus />
                        </span>
                    </Tooltip>
                </label>

            </div>
        </div>
    )
}

function DinamicInput({ item, index: indexQuestion, state, updateState, typeChecklist }) {

    const { inputvalue, outputvalue, question } = item;

    const keyValue = typeChecklist === 'entrada'? 'inputvalue': 'outputvalue';
    const dinamicValue = typeChecklist === 'entrada'? inputvalue: outputvalue;

    return (
        <Input
            required
            className="rounded-md shadow-md"
            id={`id_${question.trim()}`}
            name={question}
            label={question}
            value={dinamicValue}
            onChange={(e) => OnChangeDinamic(e.target.value, keyValue, indexQuestion, state, updateState)}
        />
    )
}

function DinamicSelect({ item, typeChecklist }) {

    const { options, inputvalue, outputvalue, question } = item;

    const keyValue = typeChecklist === 'entrada'? 'inputvalue': 'outputvalue';

    return (

        <Select
            id={`id_${question.trim()}`}
            className="max-w-md"
            name={question}
            label={question}
            onChange={(e) => OnChangeDinamic(e.target.value, keyValue, indexQuestion, state, updateState)}
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

function DinamicTextArea({ item, index: indexQuestion, state, updateState, typeChecklist }) {

    const { inputvalue, outputvalue, question } = item;

    const keyValue = typeChecklist === 'entrada'? 'inputvalue': 'outputvalue';
    const dinamicValue = typeChecklist === 'entrada'? inputvalue: outputvalue;

    return (
        <>
            <Textarea
                id={`id_${question.trim()}`}
                onChange={(e) => OnChangeDinamic(e.target.value, keyValue, indexQuestion, state, updateState)}
                className="max-w-xs rounded-md shadow-md"
                value={dinamicValue}
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
            [key]: newValue,
            [key2]: newValue
        };

        updateState(copyState)

    } catch (error) {
        console.error(error)
    }
}