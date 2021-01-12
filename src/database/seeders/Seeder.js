require('../../config/dotenv')();
require('../../config/sequelize');

const seedRoles = require('./RoleSeeder');

// Self Invoking Function (função anônima que chama a si mesma quando é definida)
(async () => {
  try {
    await seedRoles();
    
  } catch(err) { console.log(err) }
})();

