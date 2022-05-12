const workoutService = require('../services/workoutService');

const getAllWorkouts = (req, res) => {
    const allWorkouts = workoutService.getAllWorkouts();
    res.status(200).send({
        status: "OK",
        data: allWorkouts,
    });
};

const getOneWorkout = (req, res) => {
    const {
        params: { workoutId },
    } = req;
    
    if (!workoutId) {
        res.status(400).send("workoutId param required");
        return;
    }

    const workout = workoutService.getOneWorkout(workoutId);
    res.status(200).send({
        status: "OK",
        data: workout,
    });
};

const createNewWorkout = (req, res) => {
    const { body } = req;
    if (
        !body.name ||
        !body.mode ||
        !body.equipment ||
        !body.exercises ||
        !body.trainerTips
    ) {
        return;
    }

    const newWorkout = {
        name: body.name,
        mode: body.mode,
        equipment: body.equipment,
        exercises: body.exercises,
        trainerTips: body.trainerTips,
    }

    const createdWorkout = workoutService.createNewWorkout(newWorkout);
    res.status(201).send({
        status: "OK",
        data: createdWorkout,
    });
};

const updateOneWorkout = (req, res) => {
    const {
        body,
        params: { workoutId },
    } = req;

    if (!workoutId) {
        return;
    }

    const updatedWorkout = workoutService.updateOneWorkout(workoutId, body);
    res.status(200).send({
        status: "OK",
        data: updatedWorkout
    });
};

const deleteOneWorkout = (req, res) => {
    const {
        params: { workoutId }
    } = req;

    if (!workoutId) {
        return;
    }

    workoutService.deleteOneWorkout(workoutId);
    res.status(204).send({
        status: "OK",
        message: "workout deleted"
    });
};

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout,
};