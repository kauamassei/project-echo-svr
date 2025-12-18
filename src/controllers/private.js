import { PrismaClient } from "@prisma/client";
import multer from "multer";

const prisma = new PrismaClient();
const upload = multer();

export async function showMeUserController(req, res) {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
      
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Falha ao buscar usuário" });
  }
  console.log("REQ.USER:", req.user);
}

export async function listUsersController(req, res) {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json({ message: "Usuários cadastrados: ", users });
  } catch (error) {
    res.status(500).json({ message: "Falha no servidor" });
  }
}

export async function uploadImageController(req, res) {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: "Nenhuma imagem enviada" });
    }

    const avatarPath = `http://localhost:3333/uploads/${req.file.filename}`
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        avatar: avatarPath,
      },
    });

    console.log(req.file);

    return res.status(200).json({
      message: "Imagem atualizada com sucesso!",
      avatar: user.avatar,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Falha no servidor" });
  }
}
