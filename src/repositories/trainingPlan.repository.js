import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function create(data) {
  return prisma.trainingPlan.create({ data });
}

function findByUser(userId) {
  return prisma.trainingPlan.findMany({
    where: { userId },
    include: {
      trainingProfile: true,
      sessions: true,
    },
  });
}

async function findById(id) {
  return prisma.trainingPlan.findUnique({
    where: { id },
    include: {
      trainingProfile: true,
    },
  });
}

async function deleteById(id) {
  return prisma.trainingPlan.delete({
    where: { id },
  });
}
export default {
  create,
  findByUser,
  findById,
  deleteById,
};
