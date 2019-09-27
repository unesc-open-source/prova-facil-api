const mongoose = require('../config/db');
const bcrypt = require('bcryptjs');

const AlunoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    code: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Aluno = mongoose.model('Aluno', AlunoSchema);

module.exports = Aluno;