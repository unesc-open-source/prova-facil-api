const mongoose = require('../config/db');

const RespostaSchema = new mongoose.Schema({
    idQuestao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Questao',
        require: true
    },
    idAlternativa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alternativa',
    },
    idAluno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aluno',
        require: true
    },
    answer: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Resposta = mongoose.model('Resposta', RespostaSchema);

module.exports = Resposta;