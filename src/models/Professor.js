const mongoose = require('../config/db');
const bcrypt = require('bcryptjs');

const ProfessorSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

ProfessorSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const Professor = mongoose.model('Professor', ProfessorSchema);

module.exports = Professor;