const express = require('express');
const router = express.Router();
const Alternativa = require('../models/Alternativa');
const AlternativaService = require('../services/AlternativaService');
const alternativaService = new AlternativaService();

/**
 * @typedef Alternativa
 * @property {string} idQuestao.required - Id da questão
 * @property {string} description.required - Descrição da alternativa
 */

/**
 * @route POST /alternativa
 * @group Alternativa - Operações relacionadas a alternativa
 * @param {Alternativa.model} Alternativa.body.required - Informações da nova alternativa
 * @produces application/json
 * @returns {Sucess}  200 - Salvo com sucesso
 */
router.post('', async(req, res) => {
    res.send(await alternativaService.save(req.body));
});

/**
 * @route PUT /alternativa
 * @group Alternativa - Operações relacionadas a alternativa
 * @param {string} id.query.required - Id da alternativa
 * @param {Alternativa.model} alternativa.body.required - Informações da alternativa a ser atualizada.
 * @produces application/json
 * @returns {Sucess}  200 - Atualizado com sucesso
 */
router.put('/:id', async(req, res) => {
    res.send(await alternativaService.update(req.params.id, req.body));
});


/**
 * @route Get /alternativa
 * @group Alternativa - Operações relacionadas a alternativa
 * @produces application/json
 * @returns {Sucess}  200 - Busca retornada com sucesso
 */
router.get('', async(req, res) => {
    res.send(await AlternativaService.getAll());
});

/**
 * @route Get /alternativa/id
 * @group Alternativa - Operações relacionadas a alternativa
 * @param {string} id.required - Id da alternativa
 * @produces application/json
 * @returns {Sucess}  200 - Busca retornada com sucesso
 */
router.get('/:id', async(req, res) => {
    res.send(await AlternativaService.getById(req.params.id));
});

/**
 * @route Delete /alternativa/id
 * @group Alternativa - Operações relacionadas a alternativa
 * @param {string} id.params.required - Id da questão
 * @produces application/json
 * @returns {Sucess}  200 - Deletado com sucesso
 */
router.delete('/:id', async(req, res) => {
    res.send(await AlternativaService.delete(req.params.id));
});

module.exports = app => app.use('/alternativa', router);