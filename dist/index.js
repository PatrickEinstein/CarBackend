import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import swaggerconfig from "./config/SwaggerUiDocs.js";
import swaggerUi from "swagger-ui-express";
import http from "http";
import upload from "./config/Multer.js";
import { Server } from "socket.io";
import LoginRouter from "./Routes/login.js";
import RegisterRouter from "./Routes/register.js";
import createProductRouter from "./Routes/createProduct.js";
import DeleteProductRouter from "./Routes/deleteProduct.js";
import getAllProductsRouter from "./Routes/getAllProducts.js";
import UpdateProductRouter from "./Routes/updateProduct.js";
import getAllUsersRouter from "./Routes/getAllUsers.js";
import GetAUserRouter from "./Routes/getUserByid.js";
import UpdateUserRouter from "./Routes/updateUser.js";
import DeleteUserRouter from "./Routes/deleteUsers.js";
import GetProductRouter from "./Routes/getProductByid.js";
import cors from "cors";
import helmet from "helmet";
const app = express();
const server = http.createServer(app);
const router = express.Router();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(upload.any()); //THIS IS MULTER JUST IN CASE I WILL BE NEEDING IT
router.get("/", (req, res) => {
    res.json({ message: "Welcome to the Cars Booking Service API!" });
});
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerconfig));
app.get("/api/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerconfig);
});
// AUTH
app.use("/", LoginRouter);
app.use("/", RegisterRouter);
// PRODUCT
app.use("/", createProductRouter);
app.use("/", DeleteProductRouter);
app.use("/", getAllProductsRouter);
app.use("/", GetProductRouter);
app.use("/", UpdateProductRouter);
// USER
app.use("/", getAllUsersRouter);
app.use("/", GetAUserRouter);
app.use("/", UpdateUserRouter);
app.use("/", DeleteUserRouter);
// SOCKET CONNECTION
const io = new Server(8050, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT"],
    },
});
io.on("connection", (socket) => {
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`user ${socket.id} joined room ${data}`);
    });
    socket.on("sendMessage", (data) => {
        console.log(data);
        socket.to(data.room).emit("receive_message", data);
        socket.to(data.id2).emit("receive_message", data);
    });
    socket.on("disconnect", () => { });
});
// Start the server
const port = process.env.PORT || 4200;
mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}/api/docs`);
}))
    .then(() => console.log("DB connection established"))
    .catch((err) => console.log(err.message));
