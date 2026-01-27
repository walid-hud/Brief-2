const STORAGE_KEY = "healthcare-data";

function save_data_row(new_row){
    try{
        let data  = localStorage.getItem(STORAGE_KEY)
        if(!data){
            localStorage.setItem(STORAGE_KEY , JSON.stringify([new_row]))
            return true
        }
        data = JSON.parse(data)
        if(typeof data !== "object" || !Array.isArray(data) ||
         !(data.every((item)=> typeof item === "object"))) {
            return false
        }
        const existingData = data 
        existingData.push(new_row)
        localStorage.setItem(STORAGE_KEY , JSON.stringify(data))
        return true
    }catch(e){
        console.error(e)
        return false
    }
}


function get_data_rows(){
    try{
        let data  = localStorage.getItem(STORAGE_KEY)   
        if(!data) return []
        data = JSON.parse(data)
        if(typeof data !== "object" || !Array.isArray(data) ||
         !(data.every((item)=> typeof item === "object"))) {
            return []
        }
        return data 
    }catch(e){
        console.error(e)
        return []
    }
}

function delete_data_row(id){
    try{
        const data  = localStorage.getItem(STORAGE_KEY)   
        if(!data) return false
        const parsed_data = JSON.parse(data)
        if(typeof parsed_data !== "object" || !Array.isArray(parsed_data) ||
         !(parsed_data.every((item)=> typeof item === "object"))) {
            return false
        }
        const filtered_data = (parsed_data).filter(item => item.id !== id)
        localStorage.setItem(STORAGE_KEY , JSON.stringify(filtered_data))
        return true
    }catch(e){
        console.error(e)
        return false
    }
}

export { save_data_row , get_data_rows , delete_data_row }