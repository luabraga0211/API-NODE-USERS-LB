
import { fastify } from 'fastify'
import cors from '@fastify/cors'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify();
const databasePostgres = new DatabasePostgres;

// CORS
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})

// ENDPOINTS (CRUD):

// CREATE
server.post('/users', async (request, reply) => {
    const body = request.body;
    let error = {};
    if (!body.name) {
        error.name = 'faltou o nome do usuario'
    }
    if (!body.password) {
        error.password = 'Senha ausente, crie uma'
    }
    if (!body.profile) {
        error.profile = 'Perfil ausente'
    }
    if (!userID) {
        error.userID = 'faltou o ID'
    }

    if (body.name && body.password && body.profile && userID) {
        await databasePostgres.createUser(body);
        return reply.status(201).send('A criação foi bem sucedida');
    }
    else {
        return reply.status(400).send(error);
    }

})

// READE
server.get('/users', async () => {
    const users = await databasePostgres.listUsers();
    return users;
});

// UPDATE
server.put('/users/:id', async (request, reply) => {
    const userID = request.params.id;
    const body = request.body;
    await databasePostgres.updateUser(userID, body);

    return reply.status(204).send();
})

// DELETE
server.delete('/users/:id', async (request, reply) => {
    const userID = request.params.id;
    if (userID) {
        await databasePostgres.deleteUser(userID);
        return reply.status(204).send(Usuario Deletado);
    } else {
        return reply.status(400).send('Faltou o ID');
    }


    
})


server.listen({
    port: 3333
});
