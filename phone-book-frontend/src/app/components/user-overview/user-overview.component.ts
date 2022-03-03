import { Component, OnInit, Input, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { TableFillService } from "../../services/table-fill.service";
import { Person } from '../../dto/Person';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit {

  userLoaded: Promise<boolean> = Promise.resolve(false);
  user: Person = new Person("Peter","Lustig","1","Peter.Lustig@web.de");

  constructor(public userSvc: TableFillService, private router: Router) { }

  ngOnInit(): void {
    this.userSvc.currentPerson.subscribe((person: Person) => {
      this.user = person;
    });
    this.user = {
      firstName: "Peter",
      lastName: "Lustig",
      id: "1",
      email: "Peter.Lustig@web.de"
    };
  }

  // toggle(): void {
  //   this.animate === true ? this.animate = false : this.animate = true;
  // }
}
