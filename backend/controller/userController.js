
import Notes from '../model/userModel.js'

 export const createNotes = async (req,res)=>{
  try {
    const {title,description} = req.body

    if (!title || !description) {
      return res.status(400).json({ 
        success: false, 
        message: "Title and description are required" 
      })
    }
    
    const data = await Notes.create({
      title,
      description,
      user:req.user._id
  })
    res.status(200).json({message:"data create successfull",data:data})
  } catch (error) {
    res.status(400).json({message:"send me gadbad hai"})
  }
}

export const getNotes = async(req,res)=>{
  try {
    // let id = req.params.id
    let notesData = await Notes.find({user:req.user._id})
    res.status(200).json({message:"data read successfully",data:notesData})
  } catch (error) {
    res.status(404).json({message:"read me gadbad hai"})
  }
}

export const deleteNotes = async(req,res)=>{
  try {
    let id = req.params.id
    let notesData = await Notes.findByIdAndDelete({
      _id:id,
      user: req.user._id,
  })
  if (!notesData) {
      return res.status(404).json({ message: "Note nahi mila ya aapke paas delete karne ki permission nahi hai!" });
    }
    res.status(200).json({message:"data deleted successfully",data:notesData})
  } catch (error) {
    res.status(404).json({message:"delete me gadbad hai"})
  }
}

export const updateNotes = async(req,res)=>{
  try {
    let {title , description} = req.body
    let id = req.params.id
    let updateNotes = await Notes.findByIdAndUpdate(
      {
        _id: id,
        user: req.user._id,
      },
      {
      title,
      description
    },{new:true,returnDocument:"after"})
    if (!updateNotes) {
      return res.status(404).json({
        message: "Note nahi mila ya aapke paas ise update karne ki permission nahi hai!",
      });
    }
    res.status(200).json({message:"data updated successfully",data:updateNotes})
  } catch (error) {
     res.status(404).json({message:"update me gadbad ho gye"})
  }

}