import mongoose from "mongoose";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config()

const ConnectDatabse = (app: any, PORT: number, uri: string) => {
  mongoose
    .connect(uri)
    .then(
      app.listen(PORT, async (req: Request, res: Response) => {
        console.log(`Server is running on port http://localhost:${PORT}/api/docs`);
      })
    )
    .then(async () => {
      console.log("DB connected");
    })
    .catch((err) => console.log(err));
};
export default ConnectDatabse;
