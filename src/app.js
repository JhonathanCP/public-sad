import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import groupsRouter from "./routes/groups.routes.js"
import reportsRouter from "./routes/reports.routes.js"
import authRouter from "./routes/auth.routes.js"
import usersRoutes from "./routes/user.routes.js";
import {createRoles, createAdmin} from "./libs/initialSetup.js"
import path from "path"

const app = express();
createRoles();
createAdmin();

//middlewares
// app.use(
//     cors({
//       // origin: "http://localhost:3000",
//     })
// );
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

app.use('/groups',groupsRouter)
app.use('/reports',reportsRouter)
app.use('/auth', authRouter)
app.use('/user', usersRoutes)

// Archivos estáticos
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

export default app;
