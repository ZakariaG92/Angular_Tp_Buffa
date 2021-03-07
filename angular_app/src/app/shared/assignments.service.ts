import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  assignments: Assignment[] = [
    {
      id: 1,
      nom: 'TP1 Web Components à rendre',
      dateDeRendu: new Date('2020-11-17'),
      rendu: true,
    },
    {
      id: 2,
      nom: 'TP2 Angular à rendre',
      dateDeRendu: new Date('2020-12-13'),
      rendu: false,
    },
    {
      id: 3,
      nom: 'Mini Projet Angular à rendre',
      dateDeRendu: new Date('2021-01-07'),
      rendu: false,
    },
  ];

  constructor(
    private loggingService: LoggingService,
    private http: HttpClient
  ) {}

  uri = 'http://localhost:8010/api/assignments';

  getAssignments(): Observable<Assignment[]> {
    //return of(this.assignments);
    return this.http.get<Assignment[]>(this.uri)
      .pipe(
        catchError(this.handleError<any>("getAssignments"))
      )
  }

  // Version avec promesse
  getAssignmentsPromise(): Promise<Assignment[]> {
    //return of(this.assignments);
    return this.http.get<Assignment[]>(this.uri).toPromise();
  }

  getAssignment(id: number): Observable<Assignment> {
    //let result = this.assignments.find(a => (a.id === id));

    //return of(result);
    return this.http.get<Assignment>(this.uri + '/' + id)
    .pipe(
      map(a => {
        a.nom += " MODIFIE DANS PIPE AVEC UN MAP";
        return a;
      }),
      tap(a => {
        console.log("Dans le tap");
        console.log(a);
      }),
      catchError(this.handleError<Assignment>(`getAssignment(id=${id})`))
    );
  }

  private handleError<T>(operation:any, result?:T) {
    return(error:any) : Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + " a échoué " + error.message);

      return of(result as T);
    }
  }

  addAssignment(assignment: Assignment): Observable<any> {
    this.loggingService.log(assignment, 'ajouté');

    //this.assignments.push(assignment);
    //return of("Assignement ajouté");
    return this.http.post(this.uri, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    this.loggingService.log(assignment, 'modifié');
    /*
    this.assignments.forEach((a, index) => {
      if(assignment === a) {
        this.assignments[index] = a;
      }
    });
    return of("Assignement ajouté");
    */
    return this.http.put<Assignment>(this.uri, assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    this.loggingService.log(assignment, 'supprimé');
    /*
    this.assignments.forEach((a, index) => {
      if(assignment === a) {
        this.assignments.splice(index, 1);
      }
    });

    return of("Assignement supprimé");
    */
    return this.http.delete(this.uri + '/' + assignment._id);
  }
}
