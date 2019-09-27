const ResponseBuilder = require("../common/Response");
const Resposta = require("../models/Resposta");
const Questao = require("../models/Questao");

module.exports = class RespostaService {
    async valide(obj) {

        if (!obj.idQuestao) {
            return new ResponseBuilder(false, "Id questao não informado", []);
        }

        if (!obj.idAluno) {
            return new ResponseBuilder(false, "Id aluno não informada", []);
        }

        const questao = await Questao.findById(obj.idQuestao);

        if (questao.type == "write" && !obj.answer) {
            return new ResponseBuilder(false, "Resposta não informada", []);
        }
        if (questao.type == "choices" && !obj.idAlternativa) {
            return new ResponseBuilder(false, "Aternativa não informada", []);
        }

    }

    async save(obj) {
        try {
            const validations = await this.valide(obj);
            if (validations) {
                return validations;
            }

            const resposta = await Resposta.create({...obj });
            return new ResponseBuilder(true, "Salvo com sucesso", resposta);
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

            var resposta = await Resposta.findById(id)
            resposta = obj;
            await Resposta.updateOne(obj);
            return new ResponseBuilder(true, "Atualizado com sucesso", await Resposta.findById(id));
        } catch (error) {
            return new ResponseBuilder(false, "Ocorreu um erro ao atualizar", []);
        }
    }

    async getById(id) {
        try {
            const resposta = await Resposta.findById(id);
            if (resposta) {
                return new ResponseBuilder(true, "Registro retornado com sucesso", resposta);
            }

            return new ResponseBuilder(false, "Registro não encontrado", []);
        } catch (error) {
            return new ResponseBuilder(false, "Ocorreu um erro ao buscar", []);
        }
    }

    async getAll() {
        try {
            return new ResponseBuilder(true, "Registros retornados com sucesso", await Resposta.find());
        } catch (error) {
            return new ResponseBuilder(false, "Ocorreu um erro ao buscar", []);
        }
    }

    async delete(id) {
        try {
            await Resposta.findByIdAndRemove(id);
            return new ResponseBuilder(true, "Registro excluído com sucesso", []);
        } catch (error) {
            return new ResponseBuilder(false, "Ocorreu um erro ao deletar", []);
        }
    }
}
