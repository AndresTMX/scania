import { supabase } from "../../supabase";

function useChecklist() {

    async function createNewChecklist(dataCheck) {
        try {

            const { error, data } = await supabase
            .from('checklist')
            .insert({...dataCheck})

        } catch (error) {

        }
    }

}

export { useChecklist };