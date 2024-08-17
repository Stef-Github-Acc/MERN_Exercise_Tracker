import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISES_DB_NAME = 'exercises_database';
const EXERCISE_COLLECTION = 'exercises';
const EXERCISE_CLASS = 'Exercises'; 

let connection = undefined;
let Exercise = undefined;

/**
 * This function does the following:
 *  1. Connects to the MongoDB server.
 *  2. Drop USER_COLLECTION if asked to do so.
 *  3. Creates a model class for the user schema.
 * @param {Boolean} dropCollection If true, drop USER_COLLECTION
 */
async function connect(dropCollection){
    try{
        connection = await createConnection();
        console.log("Successfully connected to MongoDB using Mongoose!");
        if(dropCollection){
            await connection.db.dropCollection(EXERCISE_COLLECTION);
        }
        Exercise = createModel();
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

/**
 * Connect to the MongoDB server for the connect string in .env file
 * @returns A connection to the server
 */
async function createConnection(){
    await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: EXERCISES_DB_NAME});
    return mongoose.connection;
}

function createModel(){
    const exerciseSchema = mongoose.Schema({
        name:{type: String, required: true},
        reps: {type: Number, required: true},
        weight: {type: Number, required: true},
        unit: {type: String, required: true},
        date: {type: String, required: true}
    });
    return mongoose.model(EXERCISE_CLASS, exerciseSchema);
}

async function createExercise(name, reps, weight, unit, date){
    const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
    return exercise.save();
}

async function getExercises(query) {
    try {
        const exercises = await Exercise.find(query).exec();
        return exercises;
    } catch (error) {
        console.error('Error fetching exercises:', error);
        throw new Error('Error fetching exercises');
    }
}

async function getExerciseById(id) {
    try {
        const exercise = await Exercise.findById(id).exec();
        return exercise;
    } catch (error) {
        console.error('Error fetching exercise by ID:', error);
        throw new Error('Error fetching exercise');
    }
}

async function updateExerciseById(id, updateData) {
    try {
        const updatedExercise = await Exercise.findByIdAndUpdate(id, updateData, { new: true }).exec();
        return updatedExercise;
    } catch (error) {
        console.error('Error updating exercise by ID:', error);
        throw new Error('Error updating exercise');
    }
}

async function deleteExerciseById(id) {
    try {
        const deletedExercise = await Exercise.findByIdAndDelete(id).exec();
        return deletedExercise;
    } catch (error) {
        console.error('Error deleting exercise by ID:', error);
        throw new Error('Error deleting exercise');
    }
}

export { connect, createExercise, getExercises, getExerciseById, updateExerciseById, deleteExerciseById };