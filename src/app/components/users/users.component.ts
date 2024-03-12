import { Component } from '@angular/core';
import { UserDto } from '../../dtos/UserDto';
import { UserService } from '../../services/user-service';
import { PagedResultDto } from 'src/app/dtos/PagedResultDto';
declare var window: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  title = 'UserModel.UI';
  users: UserDto[] = [];
  userToEdit? : UserDto;
  formModal: any;

  constructor(private userService : UserService) {}

  ngOnInit() : void {
     this.userService
     .getUsers()
     .subscribe(result => {
      this.users = result.items
     });

     this.formModal = new window.bootstrap.Modal(
      document.getElementById("myModal")
     );
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
