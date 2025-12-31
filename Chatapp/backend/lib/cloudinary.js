const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

console.log("Cloudinary Env Check:", {
    cloud_name: process.env.CLOUD_NAME ? "Present" : "Missing",
    api_key: process.env.API_KEY ? "Present" : "Missing",
    api_secret: process.env.API_SCRET ? "Present" : "Missing",
});

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SCRET,
});

module.exports = cloudinary;
