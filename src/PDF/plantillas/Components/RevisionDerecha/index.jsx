import { Text, View } from "@react-pdf/renderer";


function RevisionDerecha({ document }) {

    const { revisionDerecho } = document || {};

    const revision = revisionDerecho ? Object.values(revisionDerecho) : [];

    const revisionDerechaColumOne = revisionDerecho ? revision.slice(0, 2) : [];
    const revisionDerechaColumTwo = revisionDerecho ? revision.slice(2, 4) : [];
    const revisionDerechaColumnThree = revisionDerecho ? revision.slice(4, 6) : [];
    const revisionDerechaColumFor = revisionDerecho ? revision.slice(6, 7) : [];
    revisionDerechaColumFor.push({ question: 'empty', inputvalue: 'n/a', outputvalue: 'n/a' })


    return (
        <>
            <View style={{ display: 'flex', flexDirection: 'column', width: '100%', borderBottom: 1, }}>
                <View style={{ display: 'flex', flexDirection: 'column', width: '90%', padding: '2px', textAlign: 'center' }}>
                    <Text style={{ fontSize: '11px', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }}>Revisión de lado derecho</Text>
                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', borderBottom: 1, height: '4%' }}>

                <View style={{ display: 'flex', flexDirection: 'column', width: '20%', }}>

                    {revisionDerecho && revisionDerechaColumOne.map((element, index) => (
                        <View key={`column_one_${element.question}_${index}`}
                            style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', borderRight: 1, borderBottom: index != revisionDerechaColumOne.length - 1 ? 1 : 'none' }}>
                            <View style={{ width: '70%' }}>
                                <Text style={{ fontSize: '9px', padding: '3px', textTransform: 'capitalize' }}>
                                    {element.question}
                                </Text>
                            </View>

                            <View style={{ display: 'flex', width: '30%', flexDirection: 'row', justifyContent: 'space-around', }}>
                                <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', borderRight: 1, borderLeft: '1', width: '100%', fontFamily: 'Helvetica-Bold' }}>{element.inputvalue}</Text>
                                <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', width: '100%', fontFamily: 'Helvetica-Bold' }} >{element.outputvalue}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={{ display: 'flex', flexDirection: 'column', width: '30%', }}>

                    {revisionDerecho && revisionDerechaColumTwo.map((element, index) => (
                        <View key={`column_two_${element.question}_${index}`}
                            style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', borderRight: 1, borderBottom: index != revisionDerechaColumTwo.length - 1 ? 1 : 'none' }}>
                            <View style={{ width: '70%' }}>
                                <Text style={{ fontSize: '9px', padding: '3px', textTransform: 'capitalize' }}>
                                    {element.question}
                                </Text>
                            </View>

                            <View style={{ display: 'flex', width: '30%', flexDirection: 'row', justifyContent: 'space-around', }}>
                                <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', borderRight: 1, borderLeft: '1', width: '100%', fontFamily: 'Helvetica-Bold' }}>{element.inputvalue}</Text>
                                <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', width: '100%', fontFamily: 'Helvetica-Bold' }} >{element.outputvalue}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={{ display: 'flex', flexDirection: 'column', width: '20%', }}>

                    {revisionDerecho && revisionDerechaColumnThree.map((element, index) => (
                        <View key={`column_three_${element.question}_${index}`}
                            style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', borderRight: 1, borderBottom: index != revisionDerechaColumnThree.length - 1 ? 1 : 'none' }}>
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

                <View style={{ display: 'flex', flexDirection: 'column', width: '30%', }}>
                    {revisionDerecho && revisionDerechaColumFor.map((element, index) => (
                        <View key={`column_for_${element.question}_${index}`}
                            style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', borderBottom: index != revisionDerechaColumFor.length - 1 ? 1 : 'none' }}>
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

            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', borderBottom: 1 }}>
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

export { RevisionDerecha };