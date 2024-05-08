import express from "express";
import { connectLocalDB } from "./configs/database.js";
import http from "http";
import cors from "cors";
// import { Server } from "socket.io";
import mongoose from "mongoose";
import morgan from "morgan";
// import { disconnect } from "process";
import prefaceRouter from "./routes/information.js";
import uploadRouter from "./routes/upload.js";
import authRouter from "./routes/auth.js";
import categoriesRouter from "./routes/categories.js";
import productsRouter from "./routes/products.js";

const port = 8080;
const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

app.use(
  "/api",
  prefaceRouter,
  uploadRouter,
  authRouter,
  categoriesRouter,
  productsRouter
);

const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   // console.log("User conect :" + socket.id);
//   // room
//   socket.on("join_room", (data) => {
//     socket.join(data);
//     // console.log("User with ID:" + socket.id + ", Join room :" + data);
//   });
//   // send message
//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("received_message", data);
//   });
//   socket.on("disconnect", () => {
//     // console.log("User disconnected", socket.id);
//   });
// });

// connect mongoose local
mongoose.set("strictQuery", false);
connectLocalDB();

server.listen(port, () =>
  console.log(`Đang lắng nghe cổng http://localhost:${port}`)
);
