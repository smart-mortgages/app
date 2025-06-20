import dotenv from 'dotenv';
import path from "path";
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { Request, Response } from 'express';
import customerRouter from './routes/customers';
import express from 'express';
import cors from 'cors';
import smartMortgagesRouter from "./routes/smartMortgages";

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS with wildcard to allow all origins
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // Add this line to enable JSON parsing in the request body
app.use('/customers', customerRouter); // Add this line to mount the Task API routes
app.use('/mortgages', smartMortgagesRouter); // Add this line to mount the Task API routes

app.get('/', (req: Request, res: Response) => {
    res.send('Smart mortgages - backend');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
