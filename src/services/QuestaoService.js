const ResponseBuilder = require("../common/Response");
const md5 = require('md5');
const Questao = require("../models/Questao");
const Professor = require("../models/Professor");

module.exports = class QuestaoService {

    async valide(obj) {
        /* TODO verificar se o professor ta logado
        if (!obj.login) {
             return new ResponseBuilder(false, "Login não informado", [])
        }*/
        if (!obj.description) {
            return new ResponseBuilder(false, "Descricao não informada", []);
        }
        if (!obj.type) {
            return new ResponseBuilder(false, "Tipo não informado", []);
        }
        if (!obj.type) {
            return new ResponseBuilder(false, "Tipo não informado", []);
        }
        if (obj.type != "write" &&
            obj.type != "choices") {
            return new ResponseBuilder(false, "Tipo incorreto", []);
        }
        if (!obj.token) {
            return new ResponseBuilder(false, "Token não informado", []);
        } else {
            const professor = await Professor.findOne();
            const professorToken = md5(professor.login);

            if (obj.token != professorToken) {
                return new ResponseBuilder(false, "Token inválido", []);
            }
        }
    }

    async save(obj) {
        try {
            const validations = await this.valide(obj);
            if (validations) {
                return validations;
            }

            const questao = await Questao.create({...obj });
            return new ResponseBuilder(true, "Salvo com sucesso", questao);
        } catch (error) {
            return new ResponseBuilder(false, "Ocorreu um erro ao salvar", []);
        }
    }

    async update(id, obj) {
        try {
            const validations = await this.valide(obj);
            if (validations) {
                return validations;
            }

            var questao = await Questao.findById(id)
            questao = obj;
            await Questao.updateOne(obj);
            return new ResponseBuilder(true, "Atualizado com sucesso", await Questao.findById(id));
        } catch (error) {
            return new ResponseBuilder(false, "Ocorreu um erro ao atualizar", []);
        }
    }

    async getById(id) {
        try {
            const questao = await Questao.findById(id);
            if (questao) {
                return new ResponseBuilder(true, "Registro retornado com sucesso", questao);
            }

            return new ResponseBuilder(false, "Registro não encontrado", []);
        } catch (error) {
            return new ResponseBuilder(false, "Ocorreu um erro ao buscar", []);
        }
    }

    async getAll() {
        try {
            return new ResponseBuilder(true, "Registros retornados com sucesso", await Questao.find());
        } catch (error) {
            return new ResponseBuilder(false, "Ocorreu um erro ao buscar", []);
        }
    }

    async delete(id) {
        try {
            await Questao.findByIdAndRemove(id);
            return new ResponseBuilder(true, "Registro excluído com sucesso", []);
        } catch (error) {
            return new ResponseBuilder(false, "Ocorreu um erro ao deletar", []);
        }
    }

}