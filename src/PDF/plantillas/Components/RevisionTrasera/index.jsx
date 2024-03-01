import { Text, View } from "@react-pdf/renderer";

function RevisionTrasera({ document }) {

    const { revisionTrasera } = document || {};

    const revision = revisionTrasera ? Object.values(revisionTrasera) : [];

    const revisionTraseraColumOne = revisionTrasera ? revision.slice(0, 3) : [];
    const revisionTraseraColumTwo = revisionTrasera ? revision.slice(3, 6) : [];
    const revisionTraseraColumnThree = revisionTrasera ? revision.slice(6, 9) : [];
    const revisionTraseraColumFor = revisionTrasera ? revision.slice(9, 12) : [];

    return (
        <>
            <View style={{ display: 'flex', flexDirection: 'column', width: '100%', borderBottom: 1, }}>
                <View style={{ display: 'flex', flexDirection: 'column', width: '90%', padding: '2px', textAlign: 'center' }}>
                    <Text style={{ fontSize: '11px', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }}>Revisión de la parte trasera</Text>
                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '12%', }}>

                <View style={{ display: 'flex', flexDirection: 'column', width: '28%', height: '100%' }}>

                    {revisionTrasera && revisionTraseraColumOne.map((element, index) => (
                        <View key={`column_one_${element.question}_${index}`}
                            style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', borderRight: 1, borderBottom: index != revisionTraseraColumOne.length - 1 ? 1 : 'none', height: '33.3%' }}>
                            <View style={{ width: '70%', height: '100%' }}>
                                <Text style={{ fontSize: '9px', padding: '3px', textTransform: 'capitalize', height: '100%' }}>
                                    {element.question}
                                </Text>
                            </View>

                            <View style={{ display: 'flex', width: '30%', flexDirection: 'row', justifyContent: 'space-around', height: '100%' }}>
                                <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', borderRight: 1, borderLeft: '1', width: '100%', fontFamily: 'Helvetica-Bold', height: '100%' }}>{element.inputvalue}</Text>
                                <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', width: '100%', fontFamily: 'Helvetica-Bold', height: '100%' }} >{element.outputvalue}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={{ display: 'flex', flexDirection: 'column', width: '30%', height: '100%' }}>

                    {revisionTrasera && revisionTraseraColumTwo.map((element, index) => (
                        <View key={`column_two_${element.question}_${index}`}
                            style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', borderRight: 1, borderBottom: index != revisionTraseraColumTwo.length - 1 ? 1 : 'none', height: '33.3%' }}>
                            <View style={{ width: '70%', height: '100%' }}>
                                <Text style={{ fontSize: '9px', padding: '3px', textTransform: 'capitalize', height: '100%' }}>
                                    {element.question}
                                </Text>
                            </View>

                            <View style={{ display: 'flex', width: '30%', flexDirection: 'row', justifyContent: 'space-around', height: '100%' }}>
                                <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', borderRight: 1, borderLeft: '1', width: '100%', fontFamily: 'Helvetica-Bold', height: '100%' }}>{element.inputvalue}</Text>
                                <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', width: '100%', fontFamily: 'Helvetica-Bold', height: '100%' }} >{element.outputvalue}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={{ display: 'flex', flexDirection: 'column', width: '22%', height: '100%' }}>

                    {revisionTrasera && revisionTraseraColumnThree.map((element, index) => (
                        <View key={`column_three_${element.question}_${index}`}
                            style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', borderRight: 1, borderBottom: index != revisionTraseraColumnThree.length - 1 ? 1 : 'none', height: '33.3%' }}>
                            <View style={{ width: '70%', height: '100%' }}>
                                <Text style={{ fontSize: '9px', padding: '3px', textTransform: 'capitalize', color: element.question === 'empty' ? 'white' : 'black' }}>
                                    {element.question}
                                </Text>
                            </View>

                            <View style={{ display: 'flex', width: '30%', flexDirection: 'row', justifyContent: 'space-around', height: '100%' }}>
                                <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', borderRight: 1, borderLeft: '1', width: '100%', fontFamily: 'Helvetica-Bold', color: element.question === 'empty' ? 'white' : 'black' }}>{element.inputvalue}</Text>
                                <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', width: '100%', fontFamily: 'Helvetica-Bold', color: element.question === 'empty' ? 'white' : 'black' }} >{element.outputvalue}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={{ display: 'flex', flexDirection: 'column', width: '20%', height: '100%' }}>
                    {revisionTrasera && revisionTraseraColumFor.map((element, index) => (
                        <View key={`column_for_${element.question}_${index}`}
                            style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', borderBottom: index != revisionTraseraColumFor.length - 1 ? 1 : 'none', height: '33.3%' }}>
                            <View style={{ width: '60%', height: '100%', }}>
                                <Text style={{ fontSize: '9px', padding: '3px', textTransform: 'capitalize', color: element.question === 'empty' ? 'white' : 'black', height: '100%' }}>
                                    {element.question}
                                </Text>
                            </View>

                            <View style={{ display: 'flex', width: '40%', flexDirection: 'row', justifyContent: 'space-around', height: '100%' }}>
                                <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', borderRight: 1, borderLeft: '1', width: '100%', fontFamily: 'Helvetica-Bold', color: element.question === 'empty' ? 'white' : 'black', height: '100%' }}>{element.inputvalue}</Text>
                                <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', width: '100%', fontFamily: 'Helvetica-Bold', color: element.question === 'empty' ? 'white' : 'black', height: '100%' }} >{element.outputvalue}</Text>
                            </View>
                        </View>
                    ))}
                </View>

            </View>

            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', borderTop: 1 , borderBottom: 1}}>
                <View style={{ display: 'flex', flexDirection: 'column', padding: '2px', textAlign: 'start' , width:'auto',}}>
                    <Text style={{ fontSize: '9px', textTransform: 'capitalize' }}>observaciones :</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', padding: '3px', textAlign: 'start', }} >
                    <Text style={{ fontSize: '9px', }}>{'  '}</Text>
                </View>
            </View>
        </>
    );
}

export { RevisionTrasera };