import Api from "../api/api"


export const getNotes = async ()=>{
    const response = await Api.get("/")
    return response.data
}

export const createNote = async(noteData)=>{
    const response = await Api.post("/create",noteData)
    return response.data
}

export const deleteNote = async(id)=>{
    const response = await Api.delete(`/${id}`)
    return response.data
}

export const updateNote = async (id,updatedData) =>{
    const response = await Api.put(`/update/${id}`,updatedData)
    return response.data
}   