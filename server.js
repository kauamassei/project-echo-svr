import express from "express";
import cors from "cors";
import publicRoutes from './src/routes/publicRoutes.js'
import privateRoutes from './src/routes/privateRoutes.js'

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());

app.use('/auth', publicRoutes)
app.use('/auth', privateRoutes)


app.listen(PORT, console.log(`Servidor rodando na porta ${PORT}`));
