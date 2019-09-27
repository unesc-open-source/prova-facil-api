const mongoose = require('../config/db');

const AlternativaSchema = new mongoose.Schema({
    idQuestao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Questao',
        require: true
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Alternativa = mongoose.model('Alternativa', AlternativaSchema);

module.exports = Alternativa;