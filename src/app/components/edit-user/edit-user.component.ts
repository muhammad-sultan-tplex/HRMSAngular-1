import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PagedResultDto } from 'src/app/dtos/PagedResultDto';
import { UserDto } from 'src/app/dtos/UserDto';
import { UserService } from 'src/app/services/user-service';

declare var window: any;

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent implements OnInit{
  @Input() user? : UserDto;
  @Output() usersUpdated = new EventEmitter<UserDto[]>();
  formModal: any;

  constructor(private userService: UserService){}

  updateUser(user: UserDto) {
    this.userService
    .updateUser(user)
    .subscribe((users: PagedResultDto<UserDto>) => this.usersUpdated.emit(users.items));
  }

  deleteUser(user: UserDto) {
    this.userService
    .deleteUser(user)
    .subscribe((users: UserDto[]) => this.usersUpdated.emit(users));
  }
    
  createUser(user: UserDto) {
    this.userService
    .createUser(user)
    .subscribe((users: UserDto[]) => this.usersUpdated.emit(users));
  }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("myModal")
    );
  }

  hideModal(){
    this.formModal.hide();
  }
}
