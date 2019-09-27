const express = require('express');
const router = express.Router();
const Aluno = require('../models/Aluno');
const AlunoService = require('../services/AlunoService');
const alunoService = new AlunoService();

/**
 * @typedef Aluno
 * @property {string} name.required - Nome do aluno
 * @property {string} email.required - Email do aluno
 * @property {string} code.required - Código do aluno
 */

/**
 * @route POST /aluno
 * @group Aluno - Operações relacionadas ao aluno
 * @param {Aluno.model} aluno.body.required - Informações do novo aluno
 * @produces application/json
 * @returns {Sucess}  200 - Salvo com sucesso
 */
router.post('', async(req, res) => {
    res.send(await alunoService.save(req.body));
});

/**
 * @route PUT /aluno
 * @group Aluno - Operações relacionadas ao aluno
 * @param {string} id.query.required - Id do aluno
 * @param {Aluno.model} aluno.body.required - Informações do aluno a ser atualizado.
 * @produces application/json
 * @returns {Sucess}  200 - Atualizado com sucesso
 */
router.put('/:id', async(req, res) => {
    res.send(await alunoService.update(req.params.id, req.body));
});


/**
 * @route Get /aluno
 * @group Aluno - Operações relacionadas ao aluno
 * @produces application/json
 * @returns {Sucess}  200 - Busca retornada com sucesso
 */
router.get('', async(req, res) => {
    res.send(await alunoService.getAll());
});

/**
 * @route Get /aluno/id
 * @group Aluno - Operações relacionadas ao aluno
 * @param {string} id.required - Id do aluno
 * @produces application/json
 * @returns {Sucess}  200 - Busca retornada com sucesso
 */
router.get('/:id', async(req, res) => {
    res.send(await alunoService.getById(req.params.id));
});

/**
 * @route Delete /aluno/id
 * @group Aluno - Operações relacionadas ao aluno
 * @param {string} id.params.required - Id do aluno
 * @produces application/json
 * @returns {Sucess}  200 - Deletado com sucesso
 */
router.delete('/:id', async(req, res) => {
    res.send(await alunoService.delete(req.params.id));
});

module.exports = app => app.use('/aluno', router);