import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from '../shared/assignments.service';
import {Assignment} from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  titre = "Mon application sur les Assignments 2 !"
  formVisible = false;
  assignments:Assignment[];
  assignmentsRendus:Assignment[];
  assignmentsNonRendus:Assignment[];
  assignmentSelectionne:Assignment;


  constructor(private assignmentsService:AssignmentsService, private route: Router,) { }

  ngOnInit(): void {

    //this.assignments = this.assignmentsService.getAssignments();
    this.assignmentsService.getAssignments()
      .subscribe(assignments => {
        // exécuté que quand les données sont réellement disponible
        this.assignments = assignments;
        console.log('this.assignments', this.assignments);
        this.assignmentsRendus = this.assignments.filter( ass => ass.rendu);
        this.assignmentsNonRendus = this.assignments.filter( ass => !ass.rendu); 
      });
     /*
     this.assignmentsService.getAssignmentsPromise()
     .then(assignments => {
        this.assignments = assignments;
     });
     */
  }



  assignmentClique(assignment) {
    this.assignmentSelectionne = assignment;
  }

  public goToAddPage(){
    console.log('go add');
    this.route.navigate(["add"]);

  }


/*
  onNouvelAssignment(event:Assignment) {
    //this.assignments.push(event);
    this.assignmentsService.addAssignment(event)
    .subscribe(message => {
      console.log("message");
      this.formVisible = false; // on veut voir la liste avec le nouvel assignment
    })
  }
  */
}
