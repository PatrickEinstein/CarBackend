import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const ConnectDatabse = (app, PORT, uri) => {
    mongoose
        .connect(uri)
        .then(app.listen(PORT, async (req, res) => {
        console.log(`Server is running on port http://localhost:${PORT}/api/docs`);
    }))
        .then(async () => {
        console.log("DB connected");
    })
        .catch((err) => console.log(err));
};
export default ConnectDatabse;
