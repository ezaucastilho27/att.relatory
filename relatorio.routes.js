const express = require('express');
const router = express.Router();
const relatorioController = require('../controllers/relatorio.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

// Rotas protegidas por autenticação
router.post('/', authMiddleware, relatorioController.createRelatorio);
router.get('/', authMiddleware, relatorioController.getRelatorios);
router.get('/:id', authMiddleware, relatorioController.getRelatorioById);
router.put('/:id', authMiddleware, relatorioController.updateRelatorio);
router.delete('/:id', authMiddleware, relatorioController.deleteRelatorio);

module.exports = router;
