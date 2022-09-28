import express from "express";
import bodyParser from "body-parser";

import user from "./router/user.routes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/v1", user);

export default app;
