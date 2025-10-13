require('dotenv').config();
const express = require('express');
const sequelize = require('./sequelize');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
app.use(express.json());

// otas públicas
app.use('/auth', authRoutes);

// Rota protegida
app.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: `Bem-vindo, ${req.user.email}` });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado');
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
});
