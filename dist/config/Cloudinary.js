import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const uploadResources = async (imagePath, folder) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            folder: `${process.env.CLOUDINARY_FOLDER}/${folder}`,
            resource_type: "auto"
        });
        return result.secure_url;
    }
    catch (error) {
        return error.message;
    }
};
export default uploadResources;
