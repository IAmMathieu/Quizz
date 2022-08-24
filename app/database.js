/**
 * On remplace le connecteur à la main pr une instance de sequelize
 * il faudra passer cette instance à chacun de nos modèles pour pouvoir les initialiser
 * 
 */

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PASSWORD, {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: 'postgres',
    define: {
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    },
    logging: false
});

module.exports = sequelize;