import trainingService from "../services/training.service.js";

async function create(req, res) {
  try {
    const userId = req.user.id;
    const { rank, role, goal } = req.body;

    const training = await trainingService.createTrainingPlan({
      userId,
      rank,
      role,
      goal,
    });

    return res.status(201).json(training);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao criar treino" });
  }
}

async function list(req, res) {
  try {
    const userId = req.user.id;
    const trainings = await trainingService.listUserTrainings(userId);
    return res.json(trainings);
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Erro ao listar treinos" });
  }
}

async function remove(req, res) {
    try {
      const userId = req.user.id;
      const trainingPlanId = Number(req.params.id);
  
      await trainingService.deleteTrainingPlan({
        userId,
        trainingPlanId,
      });
  
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        message: error.message || "Erro ao apagar treino",
      });
    }
  }

export default {
  create,
  list,
  remove
};
