import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import user from "./router/user.routes.js";
import seller from "./router/seller.routes.js";
import product from "./router/product.routes.js";

const app = express();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/v1", user);
app.use("/v1", seller);
app.use("/v1", product);

export default app;
