import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { UserDto } from '../../dtos/UserDto';
import { UserService } from '../../services/user-service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

declare var window: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']  
})
export class UsersComponent {
  title = 'HRMS';
  users: UserDto[] = [];
  userToEdit? : UserDto;
  formModal: any;

  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource: MatTableDataSource<UserDto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService : UserService) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngOnInit() : void {
     this.userService
     .getUsers()
     .subscribe(result => {
      this.users = result.items;
     });
  }  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openModal(){
    this.formModal.show();
  }

  hideModal(){
    this.formModal.hide();
  }

  initNewUser() {
    this.userToEdit = new UserDto();
  }

  updatedUsersList(users: UserDto[]) {
    this.users = users;
  }

  editUser(user: UserDto) {
    this.userToEdit = user;
  }
}
