import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import groupsRouter from "./routes/groups.routes.js"
import reportsRouter from "./routes/reports.routes.js"
import authRouter from "./routes/auth.routes.js"
import usersRoutes from "./routes/user.routes.js";
import {createRoles, createAdmin} from "./libs/initialSetup.js"

const app = express();
createRoles();
createAdmin();

//middlewares
app.use(
    cors({
      // origin: "http://localhost:3000",
    })
);
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

app.use('/groups',groupsRouter)
app.use('/reports',reportsRouter)
app.use('/auth', authRouter)
app.use('/user', usersRoutes)

export default app;
