import { useDisclosure } from "@nextui-org/react";
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import { Input, Select, SelectItem, Textarea, Tooltip, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Image } from "@nextui-org/react";
//icons
import { TbPhotoPlus } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";


function ItemQuestionsDinamic({ item, index, state, updateState, typeChecklist }) {

    const render = item.type

    return (
        <div>

            {render === 'input' &&
                <DinamicInput
                    item={item}
                    index={index}
                    state={state}
                    updateState={updateState}
                    typeChecklist={typeChecklist} />}

            {render === 'select' &&
                <DinamicSelect
                    item={item}
                    index={index}
                    state={state}
                    updateState={updateState}
                    typeChecklist={typeChecklist} />}

            {render === 'checkbox' &&
                <DinamicCheckbox
                    item={item}
                    index={index}
                    state={state}
                    updateState={updateState}
                    typeChecklist={typeChecklist} />}

            {render === 'textarea' &&
                <DinamicTextArea
                    item={item}
                    index={index}
                    state={state}
                    updateState={updateState}
                    typeChecklist={typeChecklist} />}


            {render === 'image' &&
                <DinamicImage
                    item={item}
                    index={index}
                    state={state}
                    updateState={updateState}
                    typeChecklist={typeChecklist}
                />
            }


        </div>
    );
}

export { ItemQuestionsDinamic };

function DinamicCheckbox({ item, index: indexQuestion, state, updateState, typeChecklist }) {

    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

    const { options, question, type } = item;

    const questionsWhitImage = ['input', 'checkbox']

    const keyValue = typeChecklist === 'entrada' ? 'inputvalue' : 'outputvalue';
    const keyImage = questionsWhitImage.includes(type) ? 'file' : keyValue;

    return (
        <div className="flex flex-col gap-1"
            id={`id_${question.trim()}`}

        >
            <p>{question}</p>
            <FormGroup sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }} >

                {options.map((option, index) => (
                    <FormControlLabel
                        key={`checkbox_${item.question}_${option}_${index}`}
                        label={option}
                        control={
                            <Checkbox
                                className="text-white"
                                onChange={() => OnChangeDinamic(option, keyValue, indexQuestion, state, updateState)}
                                color="primary"
                                value={item[keyValue]}
                                checked={item[keyValue] === option ? true : false}
                            >
                                {option}
                            </Checkbox>
                        }
                    />
                ))}

            </FormGroup>

            {item.preview === '' &&
                <div className="flex flex-row items-center justify-end p-1">
                    <label label htmlFor={`image_${question}`}>
                        <input id={`image_${question}`} className="hidden"
                            onChange={(e) => OnChangueImage(e, keyImage, indexQuestion, state, updateState)}
                            type='file' accept='image/*' name={`image_${question}`}
                        />
                        <Tooltip content="agrega imagenes" className="text-white bg-danger">
                            <span className="text-lg cursor-pointer text-danger active:opacity-50">
                                <TbPhotoPlus />
                            </span>
                        </Tooltip>
                    </label>
                </div>}

            {item.preview != '' &&
                <div className="flex flex-row justify-end">
                    <Tooltip
                        content="ver imagene"
                        className="text-white bg-danger"
                    >
                        <Button
                            className="text-white"
                            color="primary"
                            isIconOnly
                            size="sm"
                            onClick={onOpen}

                        >
                            <TbPhotoPlus />
                        </Button>
                    </Tooltip>
                </div>
            }

            <Modal className="absolute top-10" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-2">
                                <p className="text-sm text-primary">{item.question}</p>
                                <span className="text-sm text-danger">{item[keyValue]} *</span>
                            </ModalHeader>
                            <ModalBody>
                                <Image src={item.preview} alt={item.question} />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    onClick={() => discardImage(keyImage, indexQuestion, state, updateState, () => onClose())}
                                    size="md"
                                    endContent={<FaRegTrashAlt />}
                                    color="danger"
                                >
                                    descartar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>


        </div >
    )
}

function DinamicInput({ item, index: indexQuestion, state, updateState, typeChecklist }) {

    const { inputvalue, outputvalue, question } = item;

    const keyValue = typeChecklist === 'entrada' ? 'inputvalue' : 'outputvalue';
    const dinamicValue = typeChecklist === 'entrada' ? inputvalue : outputvalue;

    return (
        <Input
            isRequired
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

    const keyValue = typeChecklist === 'entrada' ? 'inputvalue' : 'outputvalue';

    return (

        <Select
            isRequired
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

function DinamicImage({ item, typeChecklist, index: indexQuestion, state, updateState, }) {

    const { type } = item

    const questionsWhitImage = ['input', 'checkbox']
    const keyValue = typeChecklist === 'entrada' ? 'inputvalue' : 'outputvalue';
    const keyImage = questionsWhitImage.includes(type) ? 'file' : keyValue;
    


    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    return (
        <div className="flex flex-col gap-2  ">

            <p>{item.question}</p>

            {(item.preview === '') &&
                <label label htmlFor={`image_${item.question}`}>
                    <input id={`image_${item.question}`}
                        onChange={(e) => OnChangueImage(e, keyImage, indexQuestion, state, updateState)}
                        className="hidden" type='file' accept='image/*'
                        name={`image_${item.question}`}
                    />
                    <Tooltip content="agrega imagenes" className="text-white bg-danger">
                        <span className="text-4xl cursor-pointer text-danger active:opacity-50">
                            <TbPhotoPlus />
                        </span>
                    </Tooltip>
                </label>}

            {(item.preview != '') &&
                <Image
                    className="cursor-pointer"
                    isZoomed
                    height='80px'
                    width='80px'
                    src={item.preview}
                    alt={item.question}
                    onClick={onOpen}
                />
            }

            <Modal className="absolute top-10" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="w-auto">
                    {() => (
                        <div>
                            <ModalHeader className="flex flex-col gap-2">
                                <p className="text-sm text-primary">{item.question}</p>
                            </ModalHeader>
                            <ModalBody>
                                <Image src={item.preview} alt={item.question} />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    onClick={() => discardImage(keyValue, indexQuestion, state, updateState, () => onClose())}
                                    size="md"
                                    endContent={<FaRegTrashAlt />}
                                    color="danger"
                                >
                                    descartar
                                </Button>
                            </ModalFooter>
                        </div>
                    )}
                </ModalContent>
            </Modal>

        </div>
    )
}

function DinamicTextArea({ item, index: indexQuestion, state, updateState, typeChecklist }) {

    const { inputvalue, outputvalue, question } = item;

    const keyValue = typeChecklist === 'entrada' ? 'inputvalue' : 'outputvalue';
    const dinamicValue = typeChecklist === 'entrada' ? inputvalue : outputvalue;

    return (
        <>
            <Textarea
                id={`id_${question.trim()}`}
                onChange={(e) => OnChangeDinamic(e.target.value, keyValue, indexQuestion, state, updateState)}
                className="rounded-md shadow-md"
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

export const OnChangueImage = (e, key, indexQuestion, state, updateState) => {
    try {

        e.preventDefault();

        const file = e.target.files[0];
        const urlImage = URL.createObjectURL(file);

        const copyState = [...state];

        copyState[indexQuestion] = {
            ...copyState[indexQuestion],
            [key]: file,
            preview: urlImage
        };

        updateState(copyState)

    } catch (error) {
        console.error(error)
    }



}

export const discardImage = (key, indexQuestion, state, updateState, callback) => {
    try {
        const copyState = [...state];

        copyState[indexQuestion] = {
            ...copyState[indexQuestion],
            [key]: "",
            preview: ""
        };

        updateState(copyState)

        callback()

    } catch (error) {
        console.error(error)
    }
}