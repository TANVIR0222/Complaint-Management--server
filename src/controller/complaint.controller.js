import ComplaintModel from "../model/complaint.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


export const addComplaint = asyncHandler(async (req, res) => {
    const { title, description  , userId} = req.body;
  
    if (
          ![title || description || userId]                                            // Check sizes array
      ) {
        return res.status(400).json(new ApiResponse(401, {}, 'Please fill in all fields'));
      }
      

    const complaintDetails = {
        title,
        description,
        userId
        
    }

    const complaint = await ComplaintModel.create(complaintDetails)

    res.status(201).json(new ApiResponse(201, complaint, 'Complaint created successfully'));
})


//  get complaint
export  const getAllComplaint = asyncHandler(async (req, res) => {

    const complaint = await ComplaintModel.find();
  

  res.status(200).json(new ApiResponse(200, complaint , 'Complaint retrieved successfully'));
});




// 
export const getMultipleComplaint = asyncHandler( async(req,res) => {
  const { id } = req.params;

  const complaint = await ComplaintModel.find().lean(); // Use lean() for better performance if read-only
  
  if (!complaint) return res.status(404).json(new ApiResponse(404, null, 'Complaint not found'));
  
  res.status(200).json(new ApiResponse(200, complaint, 'Complaint  successfully'));
})

//Single Complaint get ById
export const getSingleComplaintById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Fetching Complaint ID:", id);
      
        // Find complaint by ID
        const complaint = await ComplaintModel.find({userId:id}).populate('userId')// ✅ Correct method
      
        // If complaint is not found, return 404 error
        if (!complaint) {
          return res.status(404).json(new ApiResponse(404, null, "Complaint not found"));
        }
      
        // Send the complaint data
        res.status(200).json(new ApiResponse(200, complaint, "Complaint retrieved successfully"));
      } catch (error) {
        console.error("Error fetching complaint:", error);
        res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
      }
      
});
    


// update complaint
export const updateComplaint = asyncHandler( async(req,res) => {
  const { id } = req.params;
  const { title, description , opinion} = req.body;

  //  id not found 
  if(!id) return res.status(400).json(new ApiResponse(400, null, 'Complaint ID is required'));

  //  update Complaint 
  const complaint = await ComplaintModel.findByIdAndUpdate({_id : id}, 
    { $set:  // Update the complaint document
      { title, description , opinion} 
    }, 
    { 
      new:true, // Return the updated document
      runValidators: true // Enforce schema validation rules
    }
  );

    //  complaint not found
  if (!complaint) return res.status(404).json(new ApiResponse(404, null, 'Complaint not found'));

  //  
  res.status(200).json(new ApiResponse(200, complaint, 'Complaint update successfully'));


})

// delete complaint
export const deleteComplaint= asyncHandler( async(req,res) => {
  const { id } = req.params;
  console.log( 'skdjgflhsd kjdsglds',id);
  

  if(!id) return res.status(400).json(new ApiResponse(400, null, 'Complaint ID is required'));

  // Use direct deletion and ensure a response with lean()
  const complaint = await ComplaintModel.findByIdAndDelete({_id : id}).lean();
  //  complaint not found
  if (!complaint) {
    return res.status(404).json(new ApiResponse(404, null, 'Complaint not found'));
  }

  res.status(200).json(new ApiResponse(200, null , 'complaint delete successfully'));

})


// Controller function to update the status of a complaint

export const updateComplaintStatus = async (req, res) => {
    const { id } = req.params; // Get the complaint ID from the request params
    const { status } = req.body; // Get the new status from the request body
  
    // Check if status is valid
    const validStatuses = ['Resolved', 'In Progress', 'Pending', 'Rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json(new ApiResponse(400, null, 'Invalid status'));
    }
  
    try {
      // Find the complaint by ID and update its status
      const complaint = await ComplaintModel.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      );
  
      // If the complaint is not found
      if (!complaint) {
        return res.status(404).json(new ApiResponse(404, null, 'Complaint not found'));
      }
  
      // Respond with the updated complaint data
      return res.status(200).json(new ApiResponse(200, complaint, 'Complaint status updated successfully'));
    } catch (error) {
      // Catch any other errors (e.g., database issues)
      console.error('Error updating complaint status:', error);
      return res.status(500).json(new ApiResponse(500, null, 'An error occurred while updating the complaint status'));
    }
  };