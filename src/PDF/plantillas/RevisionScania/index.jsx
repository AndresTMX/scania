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
import { RevisionDerecha } from "../Components/RevisionDerecha";
import { RevisionTrasera } from "../Components/RevisionTrasera";
import { RevisionIzquierda } from "../Components/RevisionIzquierda";
import { RevisionCabina } from "../Components/RevisionCabina";
import { RevisionAccesorios } from "../Components/RevisionAccesorios";
import { RevisionDatos } from "../Components/RevisionDatos";
import { RevisionBaterias } from "../Components/RevisionBaterias";
import { EntregaVehiculo } from "../Components/EntrgaVehiculo";

function RevisionScania({ checklist, auditorRecepcion, auditorLiberacion }) {

    const { document, created_at, tipo, tracto, registros } = checklist || {};


    return (
        <Document>
            <SimplePageLetter>
                <HeaderScania />
                <DataTractoScania
                    document={document}
                    registros={registros}
                    auditorRecepcion={auditorRecepcion}
                    auditorLiberacion={auditorLiberacion}
                />
                <RevisionGeneral document={document} />
                <RevisionFrontal document={document} />
                <RevisionDerecha document={document} />
                <RevisionTrasera document={document} />
                <RevisionIzquierda document={document} />
            </SimplePageLetter>
            <SimplePageLetter>
                <RevisionCabina document={document} />
                <RevisionAccesorios document={document} />
                <RevisionDatos document={document} />
                <RevisionBaterias document={document} />
                <EntregaVehiculo document={document} />
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