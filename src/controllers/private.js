import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function showMeUserController(req, res) {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
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
