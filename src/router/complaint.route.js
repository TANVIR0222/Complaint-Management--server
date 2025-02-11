import { Router } from "express";
import { addComplaint, deleteComplaint, getAllComplaint, getMultipleComplaint, getSingleComplaintById, updateComplaint, updateComplaintStatus } from "../controller/complaint.controller.js";

const router = Router();

router.route('/complaint-uploaded').post( addComplaint )
router.route('/all-complaint').get( getAllComplaint )
router.route('/multiple-complaint').get( getMultipleComplaint )
router.route('/single-complaint/:id').get( getSingleComplaintById )
router.route('/update-complaint/:id').put( updateComplaint )
router.route('/delete-complaint/:id').delete( deleteComplaint )
router.route('/update-complaint-status/:id').put( updateComplaintStatus )

export default router;  //export the router to use in other files.  //export the router to