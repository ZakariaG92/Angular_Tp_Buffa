let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
function getAssignments(req, res){
    Assignment.find((err, assignments) => {
        if(err){
            res.send(err)
        }

        res.send(assignments);
    });
}



// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    console.log("**************************");
    console.log("Get assignement");
    let assignmentId = parseInt(req.params.id);
    console.log(assignmentId);

    Assignment.findOne({id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
}

function getAssignmentById(req, res){
    let assignmentid = req.params.id;

    Assignment.find({id: assignmentid}, (err, assignments) =>{
        if(err){res.send(err)}
        res.json(assignments);
    })
}


// Récupérer un assignment par son id (GET)
function getAssignmentRenduTrue(req, res){
    let assignmentRendu = req.params.rendu;

    Assignment.find({rendu: assignmentRendu}, (err, assignments) =>{
        if(err){res.send(err)}
        res.json(assignments);
    })
}
// Ajout d'un assignment (POST)
function postAssignment(req, res){
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.nom = req.body.nom;
    assignment.note = req.body.note;
    assignment.remarques = req.body.remarques;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;
    assignment.auteur= req.body.auteur;
    assignment.matiere.nom = req.body.matiere.nom;
    assignment.matiere.matImage = req.body.matiere.matImage;
    assignment.matiere.profImage = req.body.matiere.profImage;

    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.nom} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }

      // console.log('updated ', assignment)
    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {

    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.nom} deleted`});
    })
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment, getAssignmentRenduTrue, getAssignmentById };
