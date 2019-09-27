const express = require('express');
const router = express.Router();
const Professor = require('../models/Professor');
const ProfessorService = require('../services/ProfessorService');
const professorService = new ProfessorService();

/**
 * @typedef Professor
 * @property {string} login.required - Login do professor
 * @property {string} password.required - Senha do professor
 */

/**
 * @route POST /professor
 * @group Professor - Operações relacionadas ao professor
 * @param {Professor.model} professor.body.required - Informações do novo professor
 * @produces application/json
 * @returns {Sucess}  200 - Salvo com sucesso
 */
router.post('', async(req, res) => {
    res.send(await professorService.save(req.body));
});

/**
 * @route PUT /professor
 * @group Professor - Operações relacionadas ao professor
 * @param {string} id.query.required - Id do professor
 * @param {Professor.model} professor.body.required - Informações do professor a ser atualizado.
 * @produces application/json
 * @returns {Sucess}  200 - Atualizado com sucesso
 */
router.put('/:id', async(req, res) => {
    res.send(await professorService.update(req.params.id, req.body));
});

/**
 * @route Get /professor
 * @group Professor - Operações relacionadas ao professor
 * @produces application/json
 * @returns {Sucess}  200 - Busca retornada com sucesso
 */
router.get('', async(req, res) => {
    res.send(await professorService.getAll());
});

/**
 * @route Get /professor/id
 * @group Professor - Operações relacionadas ao professor
 * @param {string} id.path.required - Id do professor
 * @produces application/json
 * @returns {Sucess}  200 - Busca retornada com sucesso
 */
router.get('/:id', async(req, res) => {
    res.send(await professorService.getById(req.params.id));
});

/**
 * @route Delete /professor/id
 * @group Professor - Operações relacionadas ao professor
 * @param {string} id.params.required - Id do professor
 * @produces application/json
 * @returns {Sucess}  200 - Deletado com sucesso
 */
router.delete('/:id', async(req, res) => {
    res.send(await professorService.delete(req.params.id));
});

module.exports = app => app.use('/professor', router);