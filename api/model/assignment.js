let mongoose = require('mongoose');
let Schema = mongoose.Schema;



let AssignmentSchema = Schema({
    id: Number,
    auteur : String,
    matiere:{ nom: String, matImage: String , profImage : String },
    dateDeRendu: Date,
    nom: String,
    note: Number,
    rendu: Boolean,
    remarques: String
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Assignment', AssignmentSchema);
