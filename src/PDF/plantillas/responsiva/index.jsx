import { View, Text, Image, PDFDownloadLink } from "@react-pdf/renderer"
import { dateCalendar } from "../../../helpers/datetime";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { scaniaLogo } from "../../../WebResources"
import { DocLetter } from "../DocLetter"
import { Button } from "@nextui-org/react"


function ResponsivaTaller({ dataResponsive }) {

    const { created_at, llaves, responsable, users } = dataResponsive || {};

    const { nombre, apellido } = users || {};

    const nombreEntrega = users ? `${nombre} ${apellido}` : 'no disponible';


    return (
        <DocLetter>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Image
                    style={{ width: '200px', height: 'auto' }}
                    src={scaniaLogo}
                />
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>

                <Text style={{ fontFamily: 'Helvetica-Bold', borderBottom: 1, fontSize: 20 }}>Carta de Responsiva</Text>

                <View style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', alignItems: 'center' }}>

                    <Text style={{ fontSize: '12px' }}>
                        Entrega hoy {dateCalendar(created_at)} llaves de tractos SCANNIA a taller que se mencionan a continuación:
                    </Text>

                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: '10px',
                            padding: '10px',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            width: '80%'
                        }}>
                        {llaves && llaves.map((llave) => (
                            <Text
                                key={llave.chasis}
                                style={{ fontSize: '11px', borderBottom: '1' }} >
                                {llave.chasis} <Text style={{ fontSize: '10px' }}>(x{llave.llaves})</Text>
                            </Text>
                        ))}
                    </View>

                    <Text style={{ fontSize: '11px', marginBottom: '20px' }}>
                        El cual se hace entrega en óptimas condiciones para su debido uso. Comprometiéndome a cuidar y utilizar única y exclusivamente para asuntos mecánicos o movimiento interno. En caso de extravío, daño o uso inadecuado, me responsabilizo del costo de reparación o reposición del equipo
                    </Text>

                    <View style={{ width: '90%', justifyContent: 'flex-start' }}>
                        <Text style={{ fontSize: '11px', textTransform: 'uppercase' }} >RECIBI RESPONSABLE DE TALLER SCANIA</Text>
                    </View>

                    <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1px',
                        alignItems: 'center',
                        height: '100px',
                        justifyContent: 'flex-end'
                    }}>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', borderBottom: 1 }}>{responsable}</Text>
                        <Text style={{ fontSize: '10px', }}>NOMBRE Y FIRMA</Text>
                    </View>

                    <View style={{ width: '90%', justifyContent: 'flex-start' }}>
                        <Text style={{ fontSize: '11px', textTransform: 'uppercase' }}>ENTREGA</Text>
                    </View>

                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1px',
                            alignItems: 'center',
                            height: '100px',
                            justifyContent: 'flex-end'
                        }}>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', borderBottom: 1 }} >{nombreEntrega}</Text>
                        <Text style={{ fontSize: '10px' }} >NOMBRE Y FIRMA</Text>
                    </View>


                </View>
            </View>
        </DocLetter>
    )
}

function DownloadResponsive({ dataResponsive }) {

    const { created_at } = dataResponsive || {};

    const fecha = dateCalendar(created_at)

    return (
        <PDFDownloadLink
            document={<ResponsivaTaller dataResponsive={dataResponsive} />}
            fileName={`Responsiva_${fecha} `}

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
    );
}


export { ResponsivaTaller, DownloadResponsive }