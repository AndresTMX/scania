import { View, Text } from "@react-pdf/renderer";

function RevisionAccesorios({ document }) {

    const { revisionAccesorios } = document || {};

    const revision = revisionAccesorios ? Object.values(revisionAccesorios) : [];

    const revisionAccesoriosColumOne = revisionAccesorios ? revision.slice(0, 6) : [];
    const revisionAccesoriosColumTwo = revisionAccesorios ? revision.slice(7, 12) : [];
    revisionAccesoriosColumTwo.push({ question: 'empty', inputvalue: 'n/a', outputvalue: 'n/a' })

    return (
        <>
            <View style={{ display: 'flex', flexDirection: 'column', width: '100%', borderBottom: 1, }}>
                <View style={{ display: 'flex', flexDirection: 'column', width: '90%', padding: '2px', textAlign: 'center' }}>
                    <Text style={{ fontSize: '11px', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }}>
                        Revisión de interiores de cabina
                    </Text>
                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', borderBottom: 1, }}>

                <View style={{ display: 'flex', flexDirection: 'column', width: '50%', }}>

                    {revisionAccesorios && revisionAccesoriosColumOne.map((element, index) => (
                        <View key={`column_one_${element.question}_${index}`}
                            style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', borderRight: 1, borderBottom: index != revisionAccesoriosColumOne.length - 1 ? 1 : 'none' }}>
                            <View style={{ width: '70%' }}>
                                <Text style={{ fontSize: '9px', padding: '3px', textTransform: 'capitalize', color: element.question === 'empty' ? 'white' : 'black' }}>
                                    {element.question}
                                </Text>
                            </View>

                            <View style={{ display: 'flex', width: '30%', flexDirection: 'row', justifyContent: 'space-around', }}>
                                <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', borderRight: 1, borderLeft: '1', width: '100%', fontFamily: 'Helvetica-Bold', color: element.question === 'empty' ? 'white' : 'black' }}>{element.inputvalue}</Text>
                                <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', width: '100%', fontFamily: 'Helvetica-Bold', color: element.question === 'empty' ? 'white' : 'black' }} >{element.outputvalue}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={{ display: 'flex', flexDirection: 'column', width: '50%', }}>

                    {revisionAccesorios && revisionAccesoriosColumTwo.map((element, index) => (
                        <View key={`column_two_${element.question}_${index}`}
                            style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', borderBottom: index != revisionAccesoriosColumTwo.length - 1 ? 1 : 'none' }}>
                            <View style={{ width: '70%' }}>
                                <Text style={{ fontSize: '9px', padding: '3px', textTransform: 'capitalize', color: element.question === 'empty' ? 'white' : 'black' }}>
                                    {element.question}
                                </Text>
                            </View>

                            <View style={{ display: 'flex', width: '30%', flexDirection: 'row', justifyContent: 'space-around', }}>
                                <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', borderRight: 1, borderLeft: '1', width: '100%', fontFamily: 'Helvetica-Bold', color: element.question === 'empty' ? 'white' : 'black' }}>{element.inputvalue}</Text>
                                <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', width: '100%', fontFamily: 'Helvetica-Bold', color: element.question === 'empty' ? 'white' : 'black' }} >{element.outputvalue}</Text>
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

export { RevisionAccesorios };