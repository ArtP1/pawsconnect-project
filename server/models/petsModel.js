const { executeQuery } = require('../config/utils');

/*
    If we integrate 'TypeScript' this is what it would allow us to do for all of the models (each with their unique 'interface')

    interface Pet {
        pet_id: Integer,
        name: Text,
        profile_picture: Text,
        description: Text,
        breed: Text,
        color: Text,
        age: Integer,
        created_at: TimeStamp
    }
*/

const petsModel = {
    getPets: async () => {
        return await executeQuery('SELECT * FROM \"pets\"'); 
        // Expected output: https://drive.google.com/file/d/1rhBeLgJ_nXv10Vk63d1zxI_J97rDstxC/view?usp=drive_link
    },
    getPetById: async (id) => {
        return await executeQuery(`SELECT * FROM \"pets\" WHERE pet_id = $1`, [id]); // instead of using ? like in MySQL we use $1, $2, $3 in PostgreSQL
        // Expected output: https://drive.google.com/file/d/1Sk-DdMEherWwAdjfUm4BjoDAHRVKNLP7/view?usp=drive_link
    },
    getPetsByBreed: async (breed) => {
        return await executeQuery(`SELECT * FROM \"pets\" WHERE breed = $1`, [breed]); // instead of using? like in MySQL we use $1, $2, $3 in PostgreSQL
        // Expected output: https://drive.google.com/file/d/1n-oeJQEQ3K78_wIWducEmEB1iu2RDhQi/view?usp=drive_link
    },
    addPet: async (name, age, profile_pic, description, breed, color, owner_id) => {
        const result = await executeQuery(`
          INSERT INTO "pets" (name, age, profile_pic, description, breed, color, owner_id)
          VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
        `, [name, age, profile_pic, description, breed, color, owner_id]);
      
        return result.length > 0;
    },
    deleteOwnerPet: async(petId) => {
        const result = await executeQuery(`DELETE FROM \"pets\" WHERE pet_id = $1 RETURNING *`, [petId]);
        return result.length > 0;
    },
    updateOwnerPet: async(nName, nAge, nProfilePic, nDescription, nBreed, nColor, petId) => {
        const result = await executeQuery(`UPDATE \"pets\" SET name = $1, age = $2, profile_pic = $3, description = $4, breed = $5, 
                                           color = $6 WHERE pet_id = $7 RETURNING *`, [nName, nAge, nProfilePic, nDescription, nBreed, nColor, petId]);
        return result.length > 0;
    },
    getOwnerPets: async(id) => {
        return await executeQuery('SELECT pet_id, name, age, profile_pic, description, breed, color FROM \"pets\" WHERE owner_id = $1', [id]);
    }
}


module.exports = petsModel;