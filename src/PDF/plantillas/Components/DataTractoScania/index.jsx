import { View, Text, } from "@react-pdf/renderer";

function DataTractoScania({ chasis, modelo, tipo }) {
    return (
        <>
            <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>

                <View
                    style={{ display: 'flex', flexDirection: 'row', width: '33.3%', alignItems: 'center', justifyContent: 'flex-start', gap: '5px', borderRight: 1 }}>
                    <Text style={{ padding: '4px', fontSize: '10px', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }}>chasis:</Text>
                    <Text style={{ padding: '4px', fontSize: '9px' }}>{chasis}</Text>
                </View>

                <View
                    style={{ display: 'flex', flexDirection: 'row', width: '33.3%', alignItems: 'center', justifyContent: 'flex-start', gap: '5px', borderRight: 1 }}>
                    <Text style={{ padding: '4px', fontSize: '10px', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }}>modelo:</Text>
                    <Text style={{ padding: '4px', fontSize: '9px' }}>{modelo}</Text>
                </View>

                <View
                    style={{ display: 'flex', flexDirection: 'row', width: '33.3%', alignItems: 'center', justifyContent: 'flex-start', gap: '5px', }}>
                    <Text style={{ padding: '4px', fontSize: '10px', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }}>tipo de vehiculo:</Text>
                    <Text style={{ padding: '4px', fontSize: '9px' }}>{tipo}</Text>
                </View>

            </View>

            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', borderTop: 1 }}>

                <View
                    style={{ display: 'flex', flexDirection: 'column', width: '25%', alignItems: 'start', justifyContent: 'flex-start', borderRight: 1 }}>
                    <Text style={{ paddingTop: '2px', paddingLeft: '2px', fontSize: '8px', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }}>Fecha de ingreso:</Text>
                    <Text style={{ padding: '2px', fontSize: '9px' }}>{chasis}</Text>
                </View>

                <View
                    style={{ display: 'flex', flexDirection: 'column', width: '25%', alignItems: 'start', justifyContent: 'flex-start', borderRight: 1 }}>
                    <Text style={{ paddingTop: '2px', paddingLeft: '2px', fontSize: '8px', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }}>Auditor de recepción scania:</Text>
                    <Text style={{ padding: '2px', fontSize: '9px' }}>{chasis}</Text>
                </View>

                <View
                    style={{ display: 'flex', flexDirection: 'column', width: '25%', alignItems: 'start', justifyContent: 'flex-start', borderRight: 1 }}>
                    <Text style={{ paddingTop: '2px', paddingLeft: '2px', fontSize: '8px', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }}>ot:</Text>
                    <Text style={{ padding: '2px', fontSize: '9px' }}>{chasis}</Text>
                </View>

                <View
                    style={{ display: 'flex', flexDirection: 'column', width: '25%', alignItems: 'start', justifyContent: 'flex-start', }}>
                    <Text style={{ paddingTop: '2px', paddingLeft: '2px', fontSize: '9px', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }}>orgien:</Text>
                    <Text style={{ padding: '2px', fontSize: '9px' }}>{chasis}</Text>
                </View>

            </View>

            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', borderTop: 1 }}>

                <View
                    style={{ display: 'flex', flexDirection: 'column', width: '25%', alignItems: 'start', justifyContent: 'flex-start', borderRight: 1 }}>
                    <Text style={{ paddingTop: '2px', paddingLeft: '2px', fontSize: '8px', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }}>Fecha de salida:</Text>
                    <Text style={{ padding: '2px', fontSize: '9px' }}>{chasis}</Text>
                </View>

                <View
                    style={{ display: 'flex', flexDirection: 'column', width: '25%', alignItems: 'start', justifyContent: 'flex-start', borderRight: 1 }}>
                    <Text style={{ paddingTop: '2px', paddingLeft: '2px', fontSize: '8px', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }}>Auditor de liberación scania:</Text>
                    <Text style={{ padding: '2px', fontSize: '9px' }}>{chasis}</Text>
                </View>

                <View
                    style={{ display: 'flex', flexDirection: 'column', width: '25%', alignItems: 'start', justifyContent: 'flex-start', borderRight: 1 }}>
                    <Text style={{ paddingTop: '2px', paddingLeft: '2px', fontSize: '8px', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }}>ot:</Text>
                    <Text style={{ padding: '2px', fontSize: '9px' }}>{chasis}</Text>
                </View>

                <View
                    style={{ display: 'flex', flexDirection: 'column', width: '25%', alignItems: 'start', justifyContent: 'flex-start', }}>
                    <Text style={{ paddingTop: '2px', paddingLeft: '2px', fontSize: '9px', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }}>destino:</Text>
                    <Text style={{ padding: '2px', fontSize: '9px' }}>{chasis}</Text>
                </View>

            </View>

        </>
    );
}

export { DataTractoScania };