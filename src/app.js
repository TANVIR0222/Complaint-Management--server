import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from "helmet";
import morgan from 'morgan';



const app = express();

app.use(cors());

// single time request client side data limit 16kb
app.use(express.json({limit: "36kb"}));
// url req % , %20 itcj
app.use(express.urlencoded({extended: true , limit: "16kb"}));
// cookieParser
app.use(cookieParser());
// 
app.use(express.static('public'));
// secure Express apps by setting HTTP response headers.
app.use(helmet());
// HTTP request logger middleware for node.js
app.use(morgan())



//import route
import userRoutes from './router/user.route.js';
import complaintRoutes from './router/complaint.route.js';



// router
app.use('/api/v1/user' , userRoutes);
app.use('/api/v1/complaint' , complaintRoutes);



export {app}