"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        id: 1,
        email: "admin@gmail.com",
        password: "U2FsdGVkX1/ILhGa1F2UPCq7VCeb6J8JoHr5xQ16nuc=",
        role: "admin",
        permissions: "{}",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Posts", null, {});
  },
};
