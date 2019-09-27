const ResponseBuilder = require("../common/Response");
const Professor = require("../models/Professor");

module.exports = class ProfessorService {
    async valide(obj) {
        if (!obj.login) {
            return new ResponseBuilder(false, "Login não informado", [])
        }

        if (!obj.password) {
            return new ResponseBuilder(false, "Senha não informada", [])
        }

        if (obj.login.length < 5) {
            return new ResponseBuilder(false, "Login muito curto", [])
        }

        if (obj.password.length < 6) {
            return new ResponseBuilder(false, "Senha muito curta", [])
        }
    }

    async save(obj) {
        try {
            const validations = await this.valide(obj);
            if (validations) {
                return validations;
            }

            const professor = await Professor.create({...obj });
            return new ResponseBuilder(true, "Salvo com sucesso", professor);
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

            var professor = await Professor.findById(id)
            professor = obj;
            await Professor.updateOne(obj);
            return new ResponseBuilder(true, "Atualizado com sucesso", await Professor.findById(id));
        } catch (error) {
            return new ResponseBuilder(false, "Ocorreu um erro ao atualizar", []);
        }
    }

    async getById(id) {
        try {
            const professor = await Professor.findById(id);
            if (professor) {
                return new ResponseBuilder(true, "Registro retornado com sucesso", professor);
            }

            return new ResponseBuilder(false, "Registro não encontrado", []);
        } catch (error) {
            return new ResponseBuilder(false, "Ocorreu um erro ao buscar", []);
        }
    }

    async getAll() {
        try {
            return new ResponseBuilder(true, "Registros retornados com sucesso", await Professor.find());
        } catch (error) {
            return new ResponseBuilder(false, "Ocorreu um erro ao buscar", []);
        }
    }

    async delete(id) {
        try {
            await Professor.findByIdAndRemove(id);
            return new ResponseBuilder(true, "Registro excluído com sucesso", []);
        } catch (error) {
            return new ResponseBuilder(false, "Ocorreu um erro ao deletar", []);
        }
    }
}