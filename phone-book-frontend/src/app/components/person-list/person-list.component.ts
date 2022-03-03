import { Component, OnInit, Directive, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableFillService } from '../../services/table-fill.service';
import { Person } from '../../dto/Person';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})

export class PersonListComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'buttons'];

  selectedRow: string | undefined;

  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataSource = new MatTableDataSource<Person>();


  constructor(private userSvc: TableFillService) { }

  ngOnInit(): void {
      
    this.userSvc.getAllUsers().subscribe(result => {
      this.dataSource = new MatTableDataSource(result);
      this.setRandomPerson(result);
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  fillOverview(row: Person): void {
  //  this.userSvc.changePerson(row);
  }
  setRandomPerson(result: Person[]): void {
      const min = 1;
      const max = result.length;
      const random = Math.floor(Math.random() * (max - min)) + min;
      this.fillOverview(result[random]);
  }

  clearInputValue(value: string){
    this.dataSource.filter = value;
  }

  openAddDialog(person: Person){
    this.userSvc.addUser(person).subscribe(() => "Succesfully created!")
  }
}
