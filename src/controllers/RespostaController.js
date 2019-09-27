const express = require('express');
const router = express.Router();
const Resposta = require('../models/Resposta');
const RespostaService = require('../services/RespostaService');
const respostaService = new RespostaService();

/**
 * @typedef Resposta
 * @property {string} idQuestao.required - Id da resposta
 * @property {string} description.required - Descrição da Resposta
 */

/**
 * @route POST /resposta
 * @group Resposta - Operações relacionadas a Resposta
 * @param {Resposta.model} resposta.body.required - Informações da nova Resposta
 * @produces application/json
 * @returns {Sucess}  200 - Salvo com sucesso
 */
router.post('', async(req, res) => {
    res.send(await respostaService.save(req.body));
});

/**
 * @route PUT /resposta
 * @group Resposta - Operações relacionadas a Resposta
 * @param {string} id.query.required - Id da Resposta
 * @param {Resposta.model} resposta.body.required - Informações da Resposta a ser atualizada.
 * @produces application/json
 * @returns {Sucess}  200 - Atualizado com sucesso
 */
router.put('/:id', async(req, res) => {
    res.send(await respostaService.update(req.params.id, req.body));
});


/**
 * @route Get /resposta
 * @group Resposta - Operações relacionadas a Resposta
 * @produces application/json
 * @returns {Sucess}  200 - Busca retornada com sucesso
 */
router.get('', async(req, res) => {
    res.send(await respostaService.getAll());
});

/**
 * @route Get /resposta/id
 * @group Resposta - Operações relacionadas a Resposta
 * @param {string} id.required - Id da Resposta
 * @produces application/json
 * @returns {Sucess}  200 - Busca retornada com sucesso
 */
router.get('/:id', async(req, res) => {
    res.send(await respostaService.getById(req.params.id));
});

/**
 * @route Delete /resposta/id
 * @group Resposta - Operações relacionadas a Resposta
 * @param {string} id.params.required - Id da resposta
 * @produces application/json
 * @returns {Sucess}  200 - Deletado com sucesso
 */
router.delete('/:id', async(req, res) => {
    res.send(await respostaService.delete(req.params.id));
});

module.exports = app => app.use('/resposta', router);