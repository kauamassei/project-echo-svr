import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function createMany(data) {
  return prisma.trainingSession.createMany({ data });
}


async function deleteByPlanId(trainingPlanId) {
  return prisma.trainingSession.deleteMany({
    where: { trainingPlanId },
  });
}

export default {
  createMany,
  deleteByPlanId
};
