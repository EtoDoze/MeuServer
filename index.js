const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

// Rota para criar um usuário
app.post('/users', async (req, res) => {
    const { nome, senha, email } = req.body;
    try {
        const newUser = await prisma.user.create({
            data: { nome, senha, email }
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar usuário." });
    }
});

// Rota para listar usuários
app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar usuários." });
    }
});

// Inicializar o servidor
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
