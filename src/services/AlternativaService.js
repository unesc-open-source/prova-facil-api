const ResponseBuilder = require("../common/Response");
const Alternativa = require("../models/Alternativa");

module.exports = class AlternativaService {
    async valide(obj) {

        if (!obj.idQuestao) {
            return new ResponseBuilder(false, "Id questao não informado", []);
        }

        if (!obj.description) {
            return new ResponseBuilder(false, "Alternativa não informada", []);
        }

    }

    async save(obj) {
        try {
            const validations = await this.valide(obj);
            if (validations) {
                return validations;
            }

            const alternativa = await Alternativa.create({...obj });
            return new ResponseBuilder(true, "Salvo com sucesso", alternativa);
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

            var alternativa = await Alternativa.findById(id)
            alternativa = obj;
            await Alternativa.updateOne(obj);
            return new ResponseBuilder(true, "Atualizado com sucesso", await Alternativa.findById(id));
        } catch (error) {
            return new ResponseBuilder(false, "Ocorreu um erro ao atualizar", []);
        }
    }

    async getById(id) {
        try {
            const alternativa = await Alternativa.findById(id);
            if (alternativa) {
                return new ResponseBuilder(true, "Registro retornado com sucesso", alternativa);
            }

            return new ResponseBuilder(false, "Registro não encontrado", []);
        } catch (error) {
            return new ResponseBuilder(false, "Ocorreu um erro ao buscar", []);
        }
    }

    async getAll() {
        try {
            return new ResponseBuilder(true, "Registros retornados com sucesso", await Alternativa.find());
        } catch (error) {
            return new ResponseBuilder(false, "Ocorreu um erro ao buscar", []);
        }
    }

    async delete(id) {
        try {
            await Alternativa.findByIdAndRemove(id);
            return new ResponseBuilder(true, "Registro excluído com sucesso", []);
        } catch (error) {
            return new ResponseBuilder(false, "Ocorreu um erro ao deletar", []);
        }
    }
}
