import { PrismaClient } from "@prisma/client";
import trainingProfileRepository from "../repositories/trainingProfile.repository.js";
import trainingPlanRepository from "../repositories/trainingPlan.repository.js";
import trainingSessionRepository from "../repositories/trainingSession.repository.js";

const prisma = new PrismaClient();

function getFrequencyByRank(rank) {
  if (["ferro", "bronze"].includes(rank)) return 5;
  if (rank === "prata") return 4;
  return 3;
}

function getSessionFocus(role, goal, dayIndex) {
  // 🔥 Prioridade máxima: mecânica
  if (goal === "melhorar_mecanica") {
    return dayIndex % 2 === 0
      ? "Aim + Deathmatch"
      : "Spray + tracking";
  }

  // 🎯 Foco por função
  const roleFocusMap = {
    duelista: [
      "Entrada de bomb + first duel",
      "Aim + Deathmatch",
    ],
    controlador: [
      "Controle de mapa + smokes",
      "Timing de rotações",
    ],
    iniciador: [
      "Uso de utilitários + informação",
      "Posicionamento + suporte ao time",
    ],
    sentinela: [
      "Defesa de bomb + armadilhas",
      "Leitura de jogo + retake",
    ],
  };

  const focusList = roleFocusMap[role];

  // segurança extra
  if (!focusList) {
    return "Treino geral";
  }

  // alterna o foco conforme o dia
  return focusList[dayIndex % focusList.length];
}


async function createTrainingPlan({ userId, rank, role, goal }) {
  // 🔒 Tudo acontece numa transaction
  return prisma.$transaction(async () => {
    // 1️⃣ Cria perfil de treino (snapshot)
    const trainingProfile = await trainingProfileRepository.create({
      userId,
      rank,
      role,
      goal,
    });

    // 2️⃣ Define frequência
    const frequency = getFrequencyByRank(rank);

    // 3️⃣ Cria plano
    const trainingPlan = await trainingPlanRepository.create({
      userId,
      trainingProfileId: trainingProfile.id,
      title: `Plano ${role} — foco em ${goal}`,
    });

    // 4️⃣ Monta sessões
    const sessions = [];

    for (let i = 1; i <= frequency; i++) {
      sessions.push({
        trainingPlanId: trainingPlan.id,
        dayLabel: `Dia ${i}`,
        focus: getSessionFocus(role, goal, i),
        durationMinutes: 60,
      });
    }

    // 5️⃣ Salva sessões
    await trainingSessionRepository.createMany(sessions);

    return {
      trainingProfile,
      trainingPlan,
      sessions,
    };
  });
}

async function deleteTrainingPlan({ userId, trainingPlanId }) {
  return prisma.$transaction(async () => {
    const plan = await trainingPlanRepository.findById(trainingPlanId);

    if (!plan) {
      throw new Error("Plano não encontrado");
    }

    if (plan.userId !== userId) {
      throw new Error("Acesso negado");
    }

    // Apaga sessões
    await trainingSessionRepository.deleteByPlanId(plan.id);

    // Apaga plano
    await trainingPlanRepository.deleteById(plan.id);

    // Apaga perfil
    await trainingProfileRepository.deleteById(
      plan.trainingProfileId
    );

    return true;
  });
}

async function listUserTrainings(userId) {
  return trainingPlanRepository.findByUser(userId);
}

export default {
  createTrainingPlan,
  listUserTrainings,
  deleteTrainingPlan
};
