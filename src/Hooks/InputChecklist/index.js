import supabase from "../../supabase";

function InputChecklist() {

    async function createNewChecklistInput(newChecklist) {
        try {

            const { error } = await supabase
                .from('checklist')
                .insert({ ...newChecklist })

            if (error) {
                throw new Error(`Error al crear checklist, error: ${error.message}`)
            }

            return { error }

        } catch (error) {
            console.error(error)
            return { error }
        }
    }


    async function updateCheckList(updates, id) {
        try {

            const { error } = await supabase
                .from('checklist')
                .update({ ...updates })
                .eq('id', id)

            if (error) {
                throw new Error(`Error al actualizar checklist, error: ${error.message}`)
            }

            return { error }

        } catch (error) {
            console.error(error)
            return { error }
        }
    }

    // function copyAndUpdate(){
    //     try {
            
    //     } catch (error) {
            
    //     }
    // }

}

export { InputChecklist };