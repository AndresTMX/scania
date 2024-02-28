import { View, Text } from "@react-pdf/renderer";

function RevisionFrontal({ document }) {

    const { revisionFrontal, revisionFluidos } = document || {};

    const revision = revisionFrontal ? Object.values(revisionFrontal) : [];
    const fluidos = revisionFluidos ? Object.values(revisionFluidos) : [];


    const revisionFrontalColumOne = revisionFrontal ? revision.slice(0, 5) : [];
    const revisionFrontalColumTwo = revisionFrontal ? revision.slice(6, 11) : [];
    const revisionFrontalColumnThree = revisionFrontal ? revision.slice(11, 14) : [];
    revisionFrontalColumnThree.push({ question: 'empty', inputvalue: 'n/a', outputvalue: 'n/a' })
    revisionFrontalColumnThree.push({ question: 'empty', inputvalue: 'n/a', outputvalue: 'n/a' })
    const revisionFrontalColumFor = revisionFluidos ? fluidos.slice(0, 4) : [];
    revisionFrontalColumFor.push({ question: 'empty', inputvalue: 'n/a', outputvalue: 'n/a' })



    return (
        <>

            <View style={{ display: 'flex', flexDirection: 'column', width: '100%', borderBottom: 1, }}>
                <View style={{ display: 'flex', flexDirection: 'column', width: '90%', padding: '2px', textAlign: 'center' }}>
                    <Text style={{ fontSize: '11px', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }}>Revisión frontal</Text>
                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', borderBottom: 1, height: '13%' }}>

                <View style={{ display: 'flex', flexDirection: 'column', width: '20%', }}>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', borderRight: 1, borderBottom: 1 }}>
                        <View style={{ width: '70%' }}>
                            <Text style={{ fontSize: '9px', padding: '3px', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }}>
                                Revisión
                            </Text>
                        </View>

                        <View style={{ display: 'flex', width: '30%', flexDirection: 'row', justifyContent: 'space-around', }}>
                            <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', borderRight: 1, borderLeft: '1', width: '100%', fontFamily: 'Helvetica-Bold' }} >E</Text>
                            <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', width: '100%', fontFamily: 'Helvetica-Bold' }} >S</Text>
                        </View>
                    </View>

                    {revisionFrontal && revisionFrontalColumOne.map((element, index) => (
                        <View key={`column_one_${element.question}_${index}`}
                            style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', borderRight: 1, borderBottom: index != revisionFrontalColumOne.length - 1 ? 1 : 'none' }}>
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
                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', borderRight: 1, borderBottom: 1, }}>
                        <View style={{ width: '70%' }}>
                            <Text style={{ fontSize: '9px', padding: '3px', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', }}>
                                Revisión
                            </Text>
                        </View>

                        <View style={{ display: 'flex', width: '30%', flexDirection: 'row', justifyContent: 'space-around', }}>
                            <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', borderRight: 1, borderLeft: '1', width: '100%', fontFamily: 'Helvetica-Bold' }} >E</Text>
                            <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', width: '100%', fontFamily: 'Helvetica-Bold' }} >S</Text>
                        </View>
                    </View>

                    {revisionFrontal && revisionFrontalColumTwo.map((element, index) => (
                        <View key={`column_two_${element.question}_${index}`}
                            style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', borderRight: 1, borderBottom: index != revisionFrontalColumTwo.length - 1 ? 1 : 'none' }}>
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
                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', borderRight: 1, borderBottom: 1, }}>
                        <View style={{ width: '70%' }}>
                            <Text style={{ fontSize: '9px', padding: '3px', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', }}>
                                Revisión
                            </Text>
                        </View>

                        <View style={{ display: 'flex', width: '30%', flexDirection: 'row', justifyContent: 'space-around', }}>
                            <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', borderRight: 1, borderLeft: '1', width: '100%', fontFamily: 'Helvetica-Bold' }} >E</Text>
                            <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', width: '100%', fontFamily: 'Helvetica-Bold' }} >S</Text>
                        </View>
                    </View>

                    {revisionFrontal && revisionFrontalColumnThree.map((element, index) => (
                        <View key={`column_three_${element.question}_${index}`}
                            style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', borderRight: 1, borderBottom: index != revisionFrontalColumnThree.length - 1 ? 1 : 'none' }}>
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
                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', borderBottom: 1, }}>
                        <View style={{ width: '70%' }}>
                            <Text style={{ fontSize: '9px', padding: '3px', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', }}>
                                Revisión de fluidos
                            </Text>
                        </View>

                        <View style={{ display: 'flex', width: '30%', flexDirection: 'row', justifyContent: 'space-around', }}>
                            <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', borderRight: 1, borderLeft: '1', width: '100%', fontFamily: 'Helvetica-Bold' }} >E</Text>
                            <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', width: '100%', fontFamily: 'Helvetica-Bold' }} >S</Text>
                        </View>
                    </View>

                    {revisionFluidos && revisionFrontalColumFor.map((element, index) => (
                        <View key={`column_for_${element.question}_${index}`}
                            style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', borderBottom: index != revisionFrontalColumFor.length - 1 ? 1 : 'none' }}>
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

            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', borderBottom:1 }}>
                <View style={{ display: 'flex', flexDirection: 'column', padding: '2px', textAlign: 'start', width: 'auto', }}>
                    <Text style={{ fontSize: '9px', textTransform: 'capitalize' }}>observaciones :</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', padding: '3px', textAlign: 'start', }} >
                    <Text style={{ fontSize: '9px', }}>{fluidos.length >= 1 ? fluidos[4].inputvalue : '  '}</Text>
                </View>
            </View>

        </>
    );
}

export { RevisionFrontal };