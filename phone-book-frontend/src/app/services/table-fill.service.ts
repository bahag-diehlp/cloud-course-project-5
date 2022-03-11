import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, retry, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Person } from '../dto/Person';
import { ApiResponse } from '../dto/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class TableFillService {

  private person = new BehaviorSubject<Person>(new Person("","","",""));
  currentPerson = this.person.asObservable();

  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();

constructor(private http: HttpClient) { }

  public getAllUsers(): Observable<Person[]> {
    const url = `${environment.baseUrl}/GetUsers`;
    return this.http.get<ApiResponse<Person[]>>(url).pipe(
      map(data => data.result),
      catchError(err => {
        console.error(`Error during getAllUsers. Error was ${JSON.stringify(err)}`);
        return of([]);
        })
      );
  }


  public getUser(id: string): Observable<Person> {
  this.loading.next(true);
  const url = `${environment.baseUrl}/${id}`;
  return this.http.get<ApiResponse<Person>>(url).pipe(
    map(data => data.result),
    catchError(err => {
      console.error(`Error during getUser. Error was ${JSON.stringify(err)}`);
      return of ();
    }),
    finalize(() => this.loading.next(false))
    );
  }

  public addUser(person: Person): Observable<Person> {
    this.loading.next(true);
    const headers = { 'content-type': 'application/json'};
    const url = `${environment.baseUrl}/Users`;
    return this.http.post<ApiResponse<Person>>(url, person, {headers} ).pipe(
      map(data => data.result),
      catchError(err => {
        console.error(`Error during getUser. Error was ${JSON.stringify(err)}`);
        return of ();
      }),
      finalize(() => this.loading.next(false))
      );
    }
}

//   public getUserWithStrings(deNumber: string, domain: string): Observable<ADProperty> {
//     const url = `${this.currInsSvc.apiServerBaseAddress}/Repository/GetUser`;
//     return this.http.get<ApiResponse<ADProperty>>(url, { params: {
//       deNumber,
//       domain
//     }}
//     ).pipe(
//       map(data => data.result),
//       catchError(err => {
//         console.error(`Error during getUser. Error was ${JSON.stringify(err)}`);
//         return of(ADProperty.getEmptyADProperty());
//       })
//     );
//   }

//   public getAllTemporaryUsers(): Observable<TempUser[]> {
//     const url = `${this.currInsSvc.apiServerBaseAddress}/TempUser/GetTempUsers`;
//     return this.http.get<ApiResponse<TempUser[]>>(url).pipe(
//       map( data => data.result ),
//       catchError(err => {
//         console.error(`Error during getAllUsers. Error was ${JSON.stringify(err)}`);
//         return of([]);
//         })
//       );
//   }

//   public getLoggedIn(): Observable<ADProperty> {
//     const url = `${this.currInsSvc.apiServerBaseAddress}/Repository/GetLoggedInUser`;
//     return this.http.get<ApiResponse<ADProperty>>(url).pipe(
//       map(data => data.result),
//       catchError(err => {
//         console.error(`Error during getLoggedIn. Error was ${JSON.stringify(err)}`);
//         return of (null);
//       })
//     );
//   }

//   public getDistributorsFromFilter(): Observable<Distributor[]> {
//     const url = `${this.currInsSvc.apiServerBaseAddress}/Group/GetDistributors`;
//     return this.http.get<ApiResponse<Distributor[]>>(url).pipe(
//       map(data => data.result),
//       catchError(err => {
//         console.log(`Error during getDistributors. Error was ${JSON.stringify(err)}`);
//         return of([]);
//       })
//     );
//   }

//   changePerson(person: PersonData): void {
//     this.person.next(person);
//   }
// }
