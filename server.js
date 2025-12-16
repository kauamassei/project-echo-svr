import express from "express";
import cors from "cors";
import publicRoutes from './src/routes/publicRoutes.js'
import privateRoutes from './src/routes/privateRoutes.js'
import path from 'path'

import auth from './src/middlewares/auth.js'

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());

app.use('/', publicRoutes)
app.use('/', auth, privateRoutes)

app.use(
    "/uploads",
    express.static(path.resolve(process.cwd(), "uploads"))
  );

app.listen(PORT, console.log(`Servidor rodando na porta ${PORT}`));
