
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function listUsersController(req, res) {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json({ message: "Usuários cadastrados: ", users });
  } catch (error) {
    res.status(500).json({ message: "Falha no servidor" });
  }
}

