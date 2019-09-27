const mongoose = require('../config/db');

const QuestaoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Questao = mongoose.model('Questao', QuestaoSchema);

module.exports = Aluno;