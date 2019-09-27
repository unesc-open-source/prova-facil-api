const ResponseBuilder = require("../common/Response");
const Aluno = require("../models/Aluno");

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports = class AlunoService {
    async valide(obj) {
        if (!obj.name) {
            return new ResponseBuilder(false, "Nome não informado", []);
        }

        if (!obj.email) {
            return new ResponseBuilder(false, "Email não informado", []);
        }

        if (!obj.code) {
            return new ResponseBuilder(false, "Código não informado", []);
        }

        if (obj.code.length < 5) {
            return new ResponseBuilder(false, "Código inválido", []);
        }

        if (obj.name.length < 5) {
            return new ResponseBuilder(false, "Nome muito curto", []);
        }

        if (!validateEmail(obj.email)) {
            return new ResponseBuilder(false, "Email inválido", []);
        }
    }

    async save(obj) {
        try {
            const validations = await this.valide(obj);
            if (validations) {
                return validations;
            }

            const aluno = await Aluno.create({...obj });
            return new ResponseBuilder(true, "Salvo com sucesso", aluno);
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

            var aluno = await Aluno.findById(id)
            aluno = obj;
            await Aluno.updateOne(obj);
            return new ResponseBuilder(true, "Atualizado com sucesso", await Aluno.findById(id));
        } catch (error) {
            return new ResponseBuilder(false, "Ocorreu um erro ao atualizar", []);
        }
    }

    async getById(id) {
        try {
            const aluno = await Aluno.findById(id);
            if (aluno) {
                return new ResponseBuilder(true, "Registro retornado com sucesso", aluno);
            }

            return new ResponseBuilder(false, "Registro não encontrado", []);
        } catch (error) {
            return new ResponseBuilder(false, "Ocorreu um erro ao buscar", []);
        }
    }

    async getAll() {
        try {
            return new ResponseBuilder(true, "Registros retornados com sucesso", await Aluno.find());
        } catch (error) {
            return new ResponseBuilder(false, "Ocorreu um erro ao buscar", []);
        }
    }

    async delete(id) {
        try {
            await Aluno.findByIdAndRemove(id);
            return new ResponseBuilder(true, "Registro excluído com sucesso", []);
        } catch (error) {
            return new ResponseBuilder(false, "Ocorreu um erro ao deletar", []);
        }
    }
}