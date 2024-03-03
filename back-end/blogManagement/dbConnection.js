const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'blogs',
    password: 'alan@2520',
    port: 5432,
});


client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch((error) => {
        console.error('Error connecting to PostgreSQL database:', error);
    });


module.exports = client
