import express from 'express';
import * as model from './exercises_model.mjs';
const app = express();
const PORT = 3000;

model.connect(true)
app.use(express.json())

// Don't change or add anything above this line

/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

app.post('/exercises', async (req, res) => {
    const { name, reps, weight, unit, date } = req.body;

    // Validate request body
    if (!name || !reps || !weight || !unit || !date) {
        return res.status(400).json({ Error: "Invalid request" });
    }

    if (typeof name !== 'string' || name.length === 0) {
        return res.status(400).json({ Error: "Invalid request" });
    }

    if (!Number.isInteger(reps) || reps <= 0) {
        return res.status(400).json({ Error: "Invalid request" });
    }

    if (!Number.isInteger(weight) || weight <= 0) {
        return res.status(400).json({ Error: "Invalid request" });
    }

    if (unit !== 'kgs' && unit !== 'lbs') {
        return res.status(400).json({ Error: "Invalid request" });
    }

    if (!isDateValid(date)) {
        return res.status(400).json({ Error: "Invalid request" });
    }

    try {
        const newExercise = await model.createExercise(name, reps, weight, unit, date);
        return res.status(201).json(newExercise);
    } catch (error) {
        console.error('Error creating exercise:', error);
        return res.status(400).json({ Error: "Invalid request" });
    }
});

app.get('/exercises', async (req, res) => {
    try {
        const exercises = await model.getExercises({});
        return res.status(200).json(exercises);
    } catch (error) {
        console.error('Error fetching exercises:', error);
        return res.status(500).json({ Error: "Internal Server Error" });
    }
});

app.get('/exercises/:_id', async (req, res) => {
    const id = req.params._id;
    try {
        const exercise = await model.getExerciseById(id);
        if (exercise) {
            return res.status(200).json(exercise);
        } else {
            return res.status(404).json({ Error: "Not found" });
        }
    } catch (error) {
        console.error('Error fetching exercise:', error);
        return res.status(500).json({ Error: "Internal Server Error" });
    }
});

app.put('/exercises/:_id', async (req, res) => {
    const id = req.params._id;
    const { name, reps, weight, unit, date } = req.body;

    if (!name || !reps || !weight || !unit || !date) {
        return res.status(400).json({ Error: "Invalid request" });
    }

    if (typeof name !== 'string' || name.length === 0) {
        return res.status(400).json({ Error: "Invalid request" });
    }

    if (!Number.isInteger(reps) || reps <= 0) {
        return res.status(400).json({ Error: "Invalid request" });
    }

    if (!Number.isInteger(weight) || weight <= 0) {
        return res.status(400).json({ Error: "Invalid request" });
    }

    if (unit !== 'kgs' && unit !== 'lbs') {
        return res.status(400).json({ Error: "Invalid request" });
    }

    if (!isDateValid(date)) {
        return res.status(400).json({ Error: "Invalid request" });
    }

    try {
        const updatedExercise = await model.updateExerciseById(id, req.body);
        if (updatedExercise) {
            return res.status(200).json(updatedExercise);
        } else {
            return res.status(404).json({ Error: "Not found" });
        }
    } catch (error) {
        console.error('Error updating exercise:', error);
        return res.status(500).json({ Error: "Internal Server Error" });
    }
});


app.delete('/exercises/:_id', async (req, res) => {
    const id = req.params._id;
    try {
        const deletedExercise = await model.deleteExerciseById(id);
        if (deletedExercise) {
            return res.status(204).send();
        } else {
            return res.status(404).json({ Error: "Not found" });
        }
    } catch (error) {
        console.error('Error deleting exercise:', error);
        return res.status(500).json({ Error: "Internal Server Error" });
    }
});

// Don't change or add anything below this line
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
