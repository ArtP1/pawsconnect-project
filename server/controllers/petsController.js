const { catchAsync } = require('../config/utils'); 
const petsModel = require('../models/petsModel');
const { sendResponse } = require('../config/responseHandler');


const petsController = {
    getPets: catchAsync(async (req, res) => {
        const pets = await petsModel.getPets();
        sendResponse(res, 200, true, {pets}, "Pets retrieved successfully");
    }),
    getPetById: catchAsync(async (req, res) => {
        const { id } = req.params;
        const pet = await petsModel.getPetById(id);
        sendResponse(res, 200, true, pet, "Pet retrieved successfully");
    }),
    getPetsByBreed: catchAsync(async (req, res) => {
        const { breed } = req.params;
        const pets = await petsModel.getPetsByBreed(breed);
        sendResponse(res, 200, true, pets, `Pets of breed ${breed} retrieved successfully`);
    })
}


module.exports = petsController;