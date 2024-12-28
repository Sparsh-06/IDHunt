import express from "express";
import responseRoutes from "./routes/responses.js";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";


dotenv.config();

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })) // You can adjust the size as needed
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

// Use the router
app.use("/response", responseRoutes);

// Start the server
const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
