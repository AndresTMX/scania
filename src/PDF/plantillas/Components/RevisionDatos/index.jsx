import { View, Text } from "@react-pdf/renderer";

function RevisionDatos({ document }) {

    const { revisionDatos } = document || {};

    const revision = revisionDatos ? Object.values(revisionDatos) : [];

    const revisionDatosColumOne = revisionDatos ? revision.slice(0, 3) : [];
    const revisionDatosColumTwo = revisionDatos ? revision.slice(3, 6) : [];

    return (
        <>
            <View style={{ display: 'flex', flexDirection: 'column', width: '100%', borderBottom: 1, }}>
                <View style={{ display: 'flex', flexDirection: 'column', width: '90%', padding: '2px', textAlign: 'center' }}>
                    <Text style={{ fontSize: '11px', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }}>
                        Resguardo de datos de funcionamiento y sops
                    </Text>
                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', borderBottom: 1, height: '12%', }}>

                <View style={{ display: 'flex', flexDirection: 'column', width: '60%', height: '100%' }}>

                    {revisionDatos && revisionDatosColumOne.map((element, index) => (
                        <View key={`column_one_${element.question}_${index}`}
                            style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', borderRight: 1, borderBottom: index != revisionDatosColumOne.length - 1 ? 1 : 'none' }}>
                            <View style={{ width: '80%', height:'100%' }}>
                                <Text style={{ fontSize: '9px', padding: '3px', textTransform: 'capitalize', color: element.question === 'empty' ? 'white' : 'black', height:'100%' }}>
                                    {element.question}
                                </Text>
                            </View>

                            <View style={{ display: 'flex', width: '20%', flexDirection: 'row', justifyContent: 'space-around', height:'100%' }}>
                                <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', borderRight: 1, borderLeft: '1', width: '100%', fontFamily: 'Helvetica-Bold', color: element.question === 'empty' ? 'white' : 'black', height:'100%' }}>{element.inputvalue}</Text>
                                <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', width: '100%', fontFamily: 'Helvetica-Bold', color: element.question === 'empty' ? 'white' : 'black', height:'100%' }} >{element.outputvalue}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={{ display: 'flex', flexDirection: 'column', width: '40%', height: '100%' }}>

                    {revisionDatos && revisionDatosColumTwo.map((element, index) => (
                        <View key={`column_two_${element.question}_${index}`}
                            style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', borderBottom: index != revisionDatosColumTwo.length - 1 ? 1 : 'none' }}>
                            <View style={{ width: '70%', height:'100%' }}>
                                <Text style={{ fontSize: '9px', padding: '3px', textTransform: 'capitalize', color: element.question === 'empty' ? 'white' : 'black', height:'100%' }}>
                                    {element.question}
                                </Text>
                            </View>

                            <View style={{ display: 'flex', width: '30%', flexDirection: 'row', justifyContent: 'space-around', height:'100%' }}>
                                <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', borderRight: 1, borderLeft: '1', width: '100%', fontFamily: 'Helvetica-Bold', color: element.question === 'empty' ? 'white' : 'black', height:'100%' }}>{element.inputvalue}</Text>
                                <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', width: '100%', fontFamily: 'Helvetica-Bold', color: element.question === 'empty' ? 'white' : 'black', height:'100%' }} >{element.outputvalue}</Text>
                            </View>
                        </View>
                    ))}
                </View>

            </View>

            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', borderBottom:'1', height:'5%' }}>
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

export { RevisionDatos };