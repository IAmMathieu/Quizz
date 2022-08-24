const { Sequelize } = require('sequelize');

// Ici on crée l'objet de type sequelize que tout mes models vont utiliser pour communiquer avec la BDD
const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PASSWORD, {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: 'postgres',
    define: {
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    }
});

module.exports = sequelize;