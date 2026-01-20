import express from "express";
import productRouter from "./router/productrouter.js";
import userRouter from "./router/userrouter.js";
import orderRouter from "./router/orderrouter.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders",orderRouter)

export default app;
