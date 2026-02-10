require("dotenv").config();

const express = require('express');

console.log("Gemini key loaded:", !!process.env.GEMINI_API_KEY);

const healthRoute = require("./routes/health.js");
const bfhlRoute = require("./routes/bfhl.js");

const app = express();
app.use(express.json());

app.use("/health", healthRoute);
app.use("/bfhl", bfhlRoute);

app.listen(3000, ()=>{
    console.log(`Server running at http://localhost:3000`);
});