const { catchAsync } = require('../config/utils'); 
const petsModel = require('../models/petsModel');
const { sendResponse } = require('../config/responseHandler');


const petsController = {
    getAllPets: catchAsync(async (req, res) => {
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
    }),
    getOwnerPets: catchAsync(async (req, res) => {
        const { id } = req.user;
        
        const pets = await petsModel.getOwnerPets(id);
        
        if(pets.length == 0) {
            return sendResponse(res, 200, false, null, "No pets found for the user");
        }

        sendResponse(res, 200, true, { pets }, "User pets retrieved successfully");
    }),
    updateOwnerPet: catchAsync(async (req, res) => {
        const { petId, nName, nAge, nProfilePic, nDescription, nBreed, nColor } = req.body;

        const updatedPet = await petsModel.updateOwnerPet(nName, nAge, nProfilePic, nDescription, nBreed, nColor, petId);

        if(!updatedPet) {
            return sendResponse(res, 404, false, null, "Pet not found or update failed.");
        }

        sendResponse(res, 200, true, updatedPet, "Pet updated successfully.");
    }),
    addPet: catchAsync(async (req, res) => {
        const { id } = req.user;
        const { name, age, profile_pic, description, breed, color } = req.body;
    
        const addedPet = await petsModel.addPet(name, age, profile_pic, description, breed, color, id);
    
        if(!addedPet) {
            return sendResponse(res, 404, false, null, "Pet not added successfully.");
        }
    
        sendResponse(res, 200, true, null, "Pet added successfully.");
    }),

    deleteOwnerPet: catchAsync(async (req, res) => {
        const { petId } = req.query;

        const deletedPet = await petsModel.deleteOwnerPet(petId);

        if (!deletedPet) {
            return sendResponse(res, 404, false, null, "Pet not found or failed to be deleted. If the problem persists, contact support for assistance.");
        }

        sendResponse(res, 200, true, null, "User pet deleted successfully");
    }),
}


module.exports = petsController;