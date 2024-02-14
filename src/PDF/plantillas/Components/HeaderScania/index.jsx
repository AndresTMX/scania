import { View, Text, Image } from "@react-pdf/renderer";
import { scaniaLogo } from "../../../../WebResources";

function HeaderScania() {
    return (
        <>
            <View style={{display:'flex', flexDirection:'row', width:'100%', borderBottom:1, height:'8%'}}>
                <View style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', width:'15%', borderRight:1 }}>
                    <Image src={scaniaLogo} alt='scania-logo' />
                </View>

                <View style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', width:'60%' }}>
                    <Text style={{ fontSize:'15px', fontFamily:'Helvetica-Bold', textAlign:'center' , letterSpacing:'1', textTransform:'uppercase', lineHeight:'1.5' }} >Revisión de tracto entrada / salida de almacenamiento 2.0</Text>
                </View>

                <View style={{display:'flex', flexDirection:'column', alignItems:'center', height:'100%', width:'9%', borderLeft:1, borderRight: 1 }}>
                    <Text style={{ fontSize:'9px', height:'33.33%', borderBottom:1,  paddingTop:'4px', width:'100%', textTransform:'uppercase' }}>{' '} aprobó</Text>
                    <Text style={{ fontSize:'9px', height:'33.33%', borderBottom:1,  paddingTop:'4px', width:'100%', textTransform:'uppercase' }}>{' '} elaboró</Text>
                    <Text style={{ fontSize:'9px', height:'33.33%', paddingTop:'4px', width:'100%', textTransform:'uppercase' }}>{' '} código</Text>
                </View>

                <View style={{display:'flex', flexDirection:'column', alignItems:'center', height:'100%', width:'16%', }}>
                    <Text style={{ fontSize:'9px', height:'33.33%', borderBottom:1 , paddingTop:'4px', width:'100%'}}>{' '} Gisela Quintero</Text>
                    <Text style={{ fontSize:'9px', height:'33.33%', borderBottom:1 , paddingTop:'4px', width:'100%'}}>{' '} SMXTAB / SMXENC</Text>
                    <Text style={{ fontSize:'9px', height:'33.33%', display:'flex',  paddingTop:'4px', width:'100%'}}>{' '} IS-BBMQA-FR-02</Text>
                </View>

            </View>
        </>
    );
}

export { HeaderScania };