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
app.use(cors(
  {
    origin: '*',
    methods: 'GET,POST',
    credentials: true
  }
));

// Use the router
app.use("/response", responseRoutes);

// Start the server
const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello to the Responses API");
});
