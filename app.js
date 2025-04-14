// Importa o framework Express, usado para criar o servidor
const express = require('express');

// Importa o middleware CORS (Cross-Origin Resource Sharing), que permite requisições de domínios diferentes
const cors = require('cors');

// Importa o mongoose, usado para conectar e interagir com o MongoDB
const mongoose = require('mongoose');

// Carrega variáveis de ambiente definidas no arquivo .env (como a string de conexão do MongoDB)
require('dotenv').config();

// Importa a função que cria o usuário administrador inicial, caso ele ainda não exista
const createInitialAdmin = require('./startup/createAdmin');

// Importa os arquivos de rota da aplicação
const authRoutes = require('./routes/auth.routes'); // Login, geração de token
const protectedRoutes = require('./routes/protected.routes'); // Rotas protegidas genéricas (tipo /api/protegido)
const userRoutes = require('./routes/user.routes'); // Cadastro, update e listagem de usuários
const caseRoutes = require('./routes/case.routes'); // Gerenciamento de casos (CRUD)
const evidenceRoutes = require('./routes/evidence.routes'); // Gerenciamento de evidências
const laudoRoutes = require('./routes/laudo.routes'); // Gerenciamento de laudos
const relatorioRoutes = require('./routes/relatorio.routes');

// Inicializa a aplicação Express
const app = express();

// Middlewares globais aplicados a todas as requisições:
// 1. Permite requisições de outros domínios
app.use(cors());

// 2. Converte automaticamente JSON recebido nas requisições para objetos JS
app.use(express.json());

// Conexão com o banco de dados MongoDB usando a URI definida no .env
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('[DB] Conectado ao MongoDB Atlas');

    // Cria o usuário admin se ainda não existir — MAS SÓ DEPOIS de conectar no banco HEIM
    createInitialAdmin();
  })
  .catch(err => console.error('[DB] Erro de conexão:', err));

// Define as rotas da API e conecta cada conjunto de endpoints ao seu respectivo controller
app.use('/api', authRoutes); // /api/login
app.use('/api', protectedRoutes); // /api/protegido
app.use('/api', userRoutes); // /api/usuarios
app.use('/api/casos', caseRoutes); // /api/casos
app.use('/api/evidencias', evidenceRoutes); // /api/evidencias
app.use('/api/laudos', laudoRoutes); // /api/laudos
app.use('/api/relatorios', relatorioRoutes);

// Exporta o app para ser usado em outro arquivo
module.exports = app;
