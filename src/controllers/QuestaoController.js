const express = require('express');
const router = express.Router();
const Questao = require('../models/Questao');
const QuestaoService = require('../services/QuestaoService');
const QuestaoService = new QuestaoService();

/**
 * @typedef Questao
 * @property {string} description.required - Descrição da questão
 * @property {string} type.required - Tipo da questão
 */

/**
 * @route POST /questao
 * @group Questao - Operações relacionadas a questão
 * @param {Questao.model} questao.body.required - Informações da nova questão
 * @produces application/json
 * @returns {Sucess}  200 - Salvo com sucesso
 */
router.post('', async(req, res) => {
    res.send(await QuestaoService.save(req.body));
});

/**
 * @route PUT /questao
 * @group Questao - Operações relacionadas a questão
 * @param {string} id.query.required - Id da questão
 * @param {Questao.model} questao.body.required - Informações da questão a ser atualizada.
 * @produces application/json
 * @returns {Sucess}  200 - Atualizado com sucesso
 */
router.put('/:id', async(req, res) => {
    res.send(await QuestaoService.update(req.params.id, req.body));
});


/**
 * @route Get /questao
 * @group Questao - Operações relacionadas a questao
 * @produces application/json
 * @returns {Sucess}  200 - Busca retornada com sucesso
 */
router.get('', async(req, res) => {
    res.send(await QuestaoService.getAll());
});

/**
 * @route Get /questao/id
 * @group Questao - Operações relacionadas a questão
 * @param {string} id.required - Id da questão
 * @produces application/json
 * @returns {Sucess}  200 - Busca retornada com sucesso
 */
router.get('/:id', async(req, res) => {
    res.send(await QuestaoService.getById(req.params.id));
});

/**
 * @route Delete /questao/id
 * @group Questao - Operações relacionadas a questão
 * @param {string} id.params.required - Id da questão
 * @produces application/json
 * @returns {Sucess}  200 - Deletado com sucesso
 */
router.delete('/:id', async(req, res) => {
    res.send(await QuestaoService.delete(req.params.id));
});

module.exports = app => app.use('/questao', router);