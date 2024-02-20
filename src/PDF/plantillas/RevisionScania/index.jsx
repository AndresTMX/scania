import { Document, View, Text, Image, PDFDownloadLink } from "@react-pdf/renderer";
import { SimplePageLetter } from "../DocLetter";
import { dateCalendar } from "../../../helpers/datetime";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { scaniaLogo } from "../../../WebResources"
import { Button } from "@nextui-org/react"
//components document
import { HeaderScania } from "../Components/HeaderScania";
import { DataTractoScania } from "../Components/DataTractoScania";
import { RevisionGeneral } from "../Components/RevisionGeneral";
import { RevisionFrontal } from "../Components/RevisionFrontal";

function RevisionScania({ checklist }) {

    const { document, created_at, tipo, tracto, registros } = checklist || {};

    const { chasis, checkIn, destino, modelo, origen, tipo: tipoTracto } = registros || {};

    return (
        <Document>
            <SimplePageLetter>
                <HeaderScania />
                <DataTractoScania chasis={chasis} tipo={tipoTracto} modelo={modelo}/>
                <RevisionGeneral/>
                <RevisionFrontal/>
            </SimplePageLetter>
            <SimplePageLetter>
                <Text>Page 2</Text>
            </SimplePageLetter>
        </Document>
    );
}



function DowloadScania({ }) {

    return (

        <PDFDownloadLink
            document={<RevisionScania />}
            fileName={`Checklist_scania`}

        >
            {({ blob, url, loading, error }) =>
                loading ? (
                    <Button
                        variant="contained"
                        color="default"
                        disabled="true"
                        size="small"
                    >
                        Cargando...</Button>
                ) : (
                    <Button
                        className="text-white input-light-base"
                        color="success"
                        size="small"
                    >
                        <FaArrowAltCircleDown />
                        Descargar
                    </Button>
                )
            }
        </PDFDownloadLink>
    )
}

export { RevisionScania, DowloadScania };