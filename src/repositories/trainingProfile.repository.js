import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function create(data) {
  return prisma.trainingProfile.create({ data });
}

function findById(id) {
  return prisma.trainingProfile.findUnique({ where: { id } });
}

async function deleteById(id) {
  return prisma.trainingProfile.delete({
    where: { id },
  });
}

export default {
  create,
  findById,
  deleteById
};
