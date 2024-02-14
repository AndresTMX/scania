import { Toaster, toast } from "sonner";
import { TableTaller } from "../../components/TableTaller";

function Taller() {
    return ( 
        <>
        
        <section className="flex flex-col h-screen justify-start" >

            <div>
                <TableTaller/>
            </div>

        </section>
        
        </>
     );
}

export { Taller };