import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService, DbService } from '../../services';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {

  todoForm: FormGroup;
  todo;

  constructor(
    private auth: AuthService,
    private db: DbService,
    private fb: FormBuilder, // private params: NavParams
    public modal: ModalController,
  ) { }

  ngOnInit() {
    const data = {
      content: '',
      status: 'pending',
      ...this.todo,
    };

    this.todoForm = this.fb.group({
      content: [
        data.content,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(250),
        ]
      ],
      status: [
        data.status,
        [
          Validators.required,
        ]
      ]
    });
  }

  async createTodo() {
    const uid = await this.auth.uid();
    const id: string = this.todo ? this.todo.id : '';
    const path = `todos/${id}`;
    const data = {
      uid,
      createdAt: Date.now(),
      ...this.todo,
      ...this.todoForm.value,
    };

    this.db.updateAt(path, data);
    this.modal.dismiss();
  }

}
