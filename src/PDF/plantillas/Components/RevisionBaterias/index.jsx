import { View, Text } from "@react-pdf/renderer";

function RevisionBaterias({ document }) {

    const { revisionBaterias } = document || {};

    const revision = revisionBaterias ? Object.values(revisionBaterias) : [];

    const revisionBateriasColumOne = revisionBaterias ? revision.slice(0, 2) : [];
    const revisionBateriasColumTwo = revisionBaterias ? revision.slice(2, 4) : [];

    return (
        <>
            <View style={{ display: 'flex', flexDirection: 'column', width: '100%', borderBottom: 1, }}>
                <View style={{ display: 'flex', flexDirection: 'column', width: '90%', padding: '2px', textAlign: 'center' }}>
                    <Text style={{ fontSize: '11px', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }}>
                        Revisión de estado de baterías (voltear)
                    </Text>
                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', width: '100%', borderBottom: 1, }}>
                <View style={{ display: 'flex', flexDirection: 'column', width: '90%', padding: '2px', textAlign: 'center' }}>
                    <Text style={{ fontSize: '9px' }}>
                        La especificación correcta de voltaje en baterías deberá ser mayor a 12v
                    </Text>
                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', borderBottom: 1, }}>

                <View style={{ display: 'flex', flexDirection: 'column', width: '50%', height: '100%', borderRight: 1, }}>

                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', borderBottom: 1, padding: '3px' }}>
                        <Text style={{ fontSize: '10px', fontFamily: 'Helvetica-Bold', textAlign: 'center' }} >Baterías de consumidores (principales)</Text>
                    </View>

                    {revisionBaterias && revisionBateriasColumOne.map((element, index) => (
                        <View key={`colum_one${element.question}`} style={{ display: 'flex', flexDirection: 'row', width: '100%', borderBottom: index != revisionBateriasColumOne.length - 1 ? 1 : 'none' }}>
                            <View style={{ display: 'flex', flexDirection: 'row', width: '60%', alignItems: 'start', }}>
                                <Text
                                    style={{ fontSize: '9px', padding: '3px' }}>
                                    Batería {index + 1} {element.inputValue}
                                </Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', width: '40%', alignItems: 'center', justifyContent: 'space-around', height: '100%', borderLeft: 1 }}>
                                <Text style={{ fontSize: '9px', fontFamily: 'Helvetica-Bold', borderRight: 1, textAlign: 'center', width: '50%', padding: '2px', height: '100%' }}>{element.inputvalue}</Text>
                                <Text style={{ fontSize: '9px', fontFamily: 'Helvetica-Bold', textAlign: 'center', width: '50%', padding: '2px', height: '100%' }}>{element.outputvalue}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={{ display: 'flex', flexDirection: 'column', width: '50%', height: '100%', borderRight: 1, }}>

                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', borderBottom: 1, padding: '3px' }}>
                        <Text style={{ fontSize: '10px', fontFamily: 'Helvetica-Bold', textAlign: 'center' }} >Baterías de arranque (gel)</Text>
                    </View>

                    {revisionBaterias && revisionBateriasColumTwo.map((element, index) => (
                        <View key={`colum_one${element.question}`} style={{ display: 'flex', flexDirection: 'row', width: '100%', borderBottom: index != revisionBateriasColumTwo.length - 1 ? 1 : 'none' }}>
                            <View style={{ display: 'flex', flexDirection: 'row', width: '60%', alignItems: 'start', }}>
                                <Text
                                    style={{ fontSize: '9px', padding: '3px' }}>
                                    Batería {index + 3} {element.inputValue}
                                </Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', width: '40%', alignItems: 'center', justifyContent: 'space-around', height: '100%', borderLeft: 1 }}>
                                <Text style={{ fontSize: '9px', fontFamily: 'Helvetica-Bold', borderRight: 1, textAlign: 'center', width: '50%', padding: '2px', height: '100%' }}>{element.inputvalue}</Text>
                                <Text style={{ fontSize: '9px', fontFamily: 'Helvetica-Bold', textAlign: 'center', width: '50%', padding: '2px', height: '100%' }}>{element.outputvalue}</Text>
                            </View>
                        </View>
                    ))}
                </View>

            </View>

            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', borderBottom: 1, height:'5%' }}>
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

export { RevisionBaterias };