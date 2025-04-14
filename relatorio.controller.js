const Relatorio = require('../models/relatorio.model');

// Criar relatório
exports.createRelatorio = async (req, res) => {
  try {
    const { caso, texto } = req.body;

    if (!caso || !texto) {
      return res.status(400).json({ message: 'Campos obrigatórios não preenchidos.' });
    }

    const novoRelatorio = new Relatorio({
      caso,
      texto,
      autor: req.user.id,
      criadoEm: new Date() // datetime explícito (opcional, pois o default já cobre)
    });

    await novoRelatorio.save();

    res.status(201).json({
      message: 'Relatório criado com sucesso.',
      relatorio: novoRelatorio
    });
  } catch (error) {
    console.error('[ERRO] Criação de relatório:', error);
    res.status(500).json({ message: 'Erro ao criar relatório.' });
  }
};

// Listar todos os relatórios
exports.getRelatorios = async (req, res) => {
  try {
    const relatorios = await Relatorio.find().populate('caso').populate('autor');
    res.status(200).json(relatorios);
  } catch (error) {
    console.error('[ERRO] Listagem de relatórios:', error);
    res.status(500).json({ message: 'Erro ao buscar relatórios.' });
  }
};

// Buscar relatório por ID
exports.getRelatorioById = async (req, res) => {
  try {
    const relatorio = await Relatorio.findById(req.params.id).populate('caso').populate('autor');
    if (!relatorio) {
      return res.status(404).json({ message: 'Relatório não encontrado.' });
    }
    res.status(200).json(relatorio);
  } catch (error) {
    console.error('[ERRO] Buscar relatório por ID:', error);
    res.status(500).json({ message: 'Erro ao buscar relatório.' });
  }
};

// Atualizar relatório
exports.updateRelatorio = async (req, res) => {
  try {
    const { texto } = req.body;

    const relatorio = await Relatorio.findByIdAndUpdate(
      req.params.id,
      { texto },
      { new: true }
    );

    if (!relatorio) {
      return res.status(404).json({ message: 'Relatório não encontrado para atualização.' });
    }

    res.status(200).json({
      message: 'Relatório atualizado com sucesso.',
      relatorio
    });
  } catch (error) {
    console.error('[ERRO] Atualização de relatório:', error);
    res.status(500).json({ message: 'Erro ao atualizar relatório.' });
  }
};

// Deletar relatório
exports.deleteRelatorio = async (req, res) => {
  try {
    const relatorio = await Relatorio.findByIdAndDelete(req.params.id);

    if (!relatorio) {
      return res.status(404).json({ message: 'Relatório não encontrado para exclusão.' });
    }

    res.status(200).json({ message: 'Relatório deletado com sucesso.' });
  } catch (error) {
    console.error('[ERRO] Exclusão de relatório:', error);
    res.status(500).json({ message: 'Erro ao deletar relatório.' });
  }
};
