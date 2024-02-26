import { View, Text, } from "@react-pdf/renderer";

function RevisionGeneral({ document }) {

    const { revisionGeneral, revisionLlaves } = document || {};

    const zonaBajaE = revisionGeneral ? revisionGeneral[0].inputvalue : 'ND';
    const zonaBajaS = revisionGeneral ? revisionGeneral[0].outputvalue : 'ND';

    const dañosCarroreciaE = revisionGeneral ? revisionGeneral[1].inputvalue : 'ND';
    const dañosCarroreciaS = revisionGeneral ? revisionGeneral[1].outputvalue : 'ND';


    return (
        <>
            <View style={{ display: 'flex', flexDirection: 'column', borderTop: 1, }}>


                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>

                    <View style={{ display: 'flex', flexDirection: 'column', width: '90%', alignItems: 'center' }}>
                        <Text style={{ fontSize: '11px', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }}>
                            revisión general de la unidad
                        </Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', width: '10%', alignItems: 'center', justifyContent: 'space-around', height: '100%', borderLeft: 1 }}>
                        <Text style={{ fontSize: '10px', fontFamily: 'Helvetica-Bold', borderRight: 1, textAlign: 'center', width: '50%', padding: '2px' }}>E</Text>
                        <Text style={{ fontSize: '10px', fontFamily: 'Helvetica-Bold', textAlign: 'center', width: '50%', padding: '2px' }}>S</Text>
                    </View>

                </View>

                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderTop: 1 }}>

                    <View style={{ display: 'flex', flexDirection: 'column', width: '90%', alignItems: 'start' }}>
                        <Text style={{ fontSize: '9px', paddingLeft: '5px' }}>
                            compruebe la zona baja de la unidad, verifique que no presente golpes y fugas
                        </Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', width: '10%', alignItems: 'center', justifyContent: 'space-around', height: '100%', borderLeft: 1 }}>
                        <Text style={{ fontSize: '9px', fontFamily: 'Helvetica-Bold', borderRight: 1, textAlign: 'center', width: '50%', padding: '2px' }}>{zonaBajaE}</Text>
                        <Text style={{ fontSize: '9px', fontFamily: 'Helvetica-Bold', textAlign: 'center', width: '50%', padding: '2px' }}>{zonaBajaS}</Text>
                    </View>

                </View>

                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderTop: 1 }}>

                    <View style={{ display: 'flex', flexDirection: 'column', width: '90%', alignItems: 'start' }}>
                        <Text style={{ fontSize: '9px', paddingLeft: '5px' }}>
                            compruebe si hay daños en la carrocería y en el funcionamiento de la unidad
                        </Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', width: '10%', alignItems: 'center', justifyContent: 'space-around', height: '100%', borderLeft: 1 }}>
                        <Text style={{ fontSize: '9px', fontFamily: 'Helvetica-Bold', borderRight: 1, textAlign: 'center', width: '50%', padding: '2px' }}>{dañosCarroreciaE}</Text>
                        <Text style={{ fontSize: '9px', fontFamily: 'Helvetica-Bold', textAlign: 'center', width: '50%', padding: '2px' }}>{dañosCarroreciaS}</Text>
                    </View>

                </View>

                {/* DETALLES FISICOS */}
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '50%', width: '100%', borderTop: 1, borderBottom: 1, }}>

                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', width: '70%', borderRight: 1, backgroundColor: 'whitesmoke' }}>
                        <Text style={{ fontSize: '12px', fontFamily: 'Helvetica-Bold', paddingBottom: '5px' }} >Detalles fisicos</Text>

                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '90%' }}>

                            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '50%', gap: '5px' }}>
                                <View style={{ display: 'flex', flexDirection: 'column', height: '95%', width: '40%', backgroundColor: 'gray' }}></View>
                                <View style={{ display: 'flex', flexDirection: 'column', height: '95%', width: '40%', backgroundColor: 'gray' }}></View>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '50%', gap: '5px' }}>
                                <View style={{ display: 'flex', flexDirection: 'column', height: '95%', width: '40%', backgroundColor: 'gray' }}></View>
                                <View style={{ display: 'flex', flexDirection: 'column', height: '95%', width: '40%', backgroundColor: 'gray' }}></View>
                            </View>

                        </View>

                    </View>

                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', width: '30%' }}>

                        <View style={{ borderBottom: 1, padding: '5px', width: '100%' }}>
                            <Text style={{ fontSize: '9px' }} >KM</Text>
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                            <View style={{ width: '70%', height: '100%' }}>
                                <Text style={{ fontSize: '9px', padding: '3px', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }}>
                                    Juegos de llaves
                                </Text>
                            </View>
                            <View style={{ display: 'flex', width: '30%', flexDirection: 'row', justifyContent: 'space-around', height: '100%', }}>
                                <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', borderLeft: 1, width: '100%', fontFamily: 'Helvetica-Bold' }}>E</Text>
                                <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', borderLeft: 1, width: '100%', fontFamily: 'Helvetica-Bold' }}>S</Text>
                            </View>
                        </View>

                        {revisionLlaves && revisionLlaves.map((item) => (
                            item.question != "observaciones" && (
                                <View key={item.question} style={{ display: 'flex', flexDirection: 'row', width: '100%', borderTop: 1 }}>
                                    <View style={{ width: '70%', height: '100%' }}>
                                        <Text style={{ fontSize: '9px', padding: '2px' }}>
                                            {item.question}
                                        </Text>
                                    </View>
                                    <View style={{ display: 'flex', width: '30%', flexDirection: 'row', justifyContent: 'space-around', height: '100%', }}>
                                        <Text style={{ fontSize: '9px', textAlign: 'center', padding: '2px', borderLeft: 1, width: '100%', }} >{item.inputvalue}</Text>
                                        <Text style={{ fontSize: '9px', textAlign: 'center', padding: '2px', borderLeft: 1, width: '100%', }} >{item.outputvalue}</Text>
                                    </View>
                                </View>
                            )
                        ))}

                        {/* <View style={{ display: 'flex', flexDirection: 'row', width: '100%', borderTop: 1 }}>
                            <View style={{ width: '70%', height: '100%' }}>
                                <Text style={{ fontSize: '9px', padding: '3px' }}>
                                3 llaves de tanques
                                </Text>
                            </View>
                            <View style={{ display: 'flex', width: '30%', flexDirection: 'row', justifyContent: 'space-around', height: '100%', }}>
                                <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', borderLeft: 1, width: '100%', color: 'white' }} >E</Text>
                                <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', borderLeft: 1, width: '100%', color: 'white' }} >S</Text>
                            </View>
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', borderTop: 1 }}>
                            <View style={{ width: '70%', height: '100%' }}>
                                <Text style={{ fontSize: '9px', padding: '3px' }}>
                                    2 llaves de gavetas
                                </Text>
                            </View>
                            <View style={{ display: 'flex', width: '30%', flexDirection: 'row', justifyContent: 'space-around', height: '100%', }}>
                                <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', borderLeft: 1, width: '100%', color: 'white' }} >E</Text>
                                <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', borderLeft: 1, width: '100%', color: 'white' }} >S</Text>
                            </View>
                        </View> */}

                        <View style={{ display: 'flex', flexDirection: 'column', width: '100%', borderTop: 1, }}>
                            <View style={{ width: '100%', borderBottom: 1 }}>
                                <Text style={{ fontSize: '9px', padding: '3px', fontFamily: 'Helvetica-Bold' }}>
                                    comentarios
                                </Text>
                            </View>
                            <View style={{ display: 'flex', width: '100%', flexDirection: 'column', }}>
                                <Text style={{ fontSize: '9px', padding: '3px' }}>
                                    comentarios efqwef
                                </Text>
                            </View>
                        </View>


                    </View>


                </View>

            </View>
        </>
    )
}

export { RevisionGeneral };