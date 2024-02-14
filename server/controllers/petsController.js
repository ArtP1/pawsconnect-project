const { catchAsync } = require('../config/utils'); 
const petsModel = require('../models/petsModel');


const petsController = {
    getPets: catchAsync(async (req, res) => {
        const pets = await petsModel.getPets();
        res.json(pets);
    }),
    getPetById: catchAsync(async (req, res) => {
        const { id } = req.params;
        const pet = await petsModel.getPetById(id);
        res.json(pet);
    }),
    getPetsByBreed: catchAsync(async (req, res) => {
        const { breed } = req.params;
        const pets = await petsModel.getPetsByBreed(breed);
        res.json(pets);
    })
}


module.exports = petsController;