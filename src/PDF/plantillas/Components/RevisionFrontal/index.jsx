import { View, Text } from "@react-pdf/renderer";

function RevisionFrontal() {
    return (
        <>

            <View style={{ display:'flex', flexDirection:'column', width:'100%', borderBottom:1 }}> 
                
                <View style={{ width:'100%', padding:'4px' , textAlign:'center'}}>
                    <Text style={{ fontSize:'9px', fontFamily:'Helvetica-Bold', width:'100%' }} >Revision frontal</Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'column'}}>

                    <View style={{ display: 'flex', flexDirection: 'column', width: '33.33%', borderLeft: 1 }}>
                        <View style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                            <View style={{ width: '70%', height: '100%' }}>
                                <Text style={{ fontSize: '9px', padding: '3px', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }}>
                                    Revision
                                </Text>
                            </View>
                            <View style={{ display: 'flex', width: '30%', flexDirection: 'row', justifyContent: 'space-around', height: '100%', }}>
                                <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', borderLeft: 1, width: '100%', fontFamily: 'Helvetica-Bold' }} >E</Text>
                                <Text style={{ fontSize: '9px', textAlign: 'center', padding: '3px', borderLeft: 1, width: '100%', fontFamily: 'Helvetica-Bold' }} >S</Text>
                            </View>
                        </View>

                    </View>


                </View>
            </View>

        </>
    );
}

export { RevisionFrontal };