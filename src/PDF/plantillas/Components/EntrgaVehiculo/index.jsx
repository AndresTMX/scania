import { View, Text } from "@react-pdf/renderer";

function EntregaVehiculo({ document }) {
    return (
        <>

            <View style={{ display: 'flex', flexDirection: 'column', width: '100%', borderBottom: 1, }}>
                <View style={{ display: 'flex', flexDirection: 'column', width: '90%', padding: '2px', textAlign: 'center' }}>
                    <Text style={{ fontSize: '11px', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }}>
                        Entrega de vehiculo
                    </Text>
                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', justifyContent: 'center', alignItems: 'center', borderBottom: 1 }}>

                <View style={{ display: 'flex', flexDirection: 'column', width: '100%', textAlign: 'start', padding: '3px' }}>
                    <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '10px' }}>Entrega</Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'column', width: '40%', textAlign: 'center', }}>
                    <Text style={{ width: '50%', padding: '5px', borderTop: 1, fontSize: '9px', width: '100%' }} >Nombre y Firma</Text>
                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', justifyContent: 'center', alignItems: 'center', borderBottom: 1 }}>

                <View style={{ display: 'flex', flexDirection: 'column', width: '100%', textAlign: 'start', padding: '3px' }}>
                    <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '10px' }}>Recibe</Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'column', width: '40%', textAlign: 'center', }}>
                    <Text style={{ width: '50%', padding: '5px', borderTop: 1, fontSize: '9px', width: '100%' }} >Nombre y Firma</Text>
                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '5%' }}>
                <View style={{ display: 'flex', flexDirection: 'column', padding: '2px', textAlign: 'start', width: 'auto', }}>
                    <Text style={{ fontSize: '9px', textTransform: 'capitalize' }}>observaciones :</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', padding: '3px', textAlign: 'start', }} >
                    <Text style={{ fontSize: '9px', }}>{'  '}</Text>
                </View>
            </View>


        </>
    );
}

export { EntregaVehiculo };