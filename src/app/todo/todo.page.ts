import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { switchMap, shareReplay, map } from 'rxjs/operators';
import { AuthService, DbService, Todo} from '../services';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {

  todos;
  filtered;

  filter = new BehaviorSubject(null);

  constructor(
    private auth: AuthService,
    private db: DbService,
    private modal: ModalController,
  ) { }

  ngOnInit() {
    const path = environment.fsCollections.todos;
    this.todos = this.auth.user$.pipe(
      switchMap(user =>
        this.db.collection$(path, ref =>
        ref
          .where('uid', '==', user.uid)
          .orderBy('createdAt', 'desc')
          .limit(25)
        )
      ),
      shareReplay(1),
    );

    console.log(this.todos);

    this.filtered = this.filter.pipe(
      switchMap(status => {
        return this.todos.pipe(
          map(arr =>
            (arr as any[]).filter(
              obj => (status ? obj.status === status : true)
            )
          )
        );
      })
    );
  }

  trackById(idx, todo) {
    return todo.id;
  }

  deleteTodo(todo) {
    if (todo === null) { return; }

    const path = `todos/${todo.id}`;
    this.db.delete(path);
  }

  toggleStatus(todo?: Todo) {
    if (todo === null) { return; }

    const path = `todos/${todo.id}`;
    const data = {
      status: ((todo.status === 'complete') ? 'pending' : 'complete'),
    };
    this.db.updateAt(path, data);
  }

  updateFilter(val) {
    this.filter.next(val);
  }

  async presentTodoForm(todo?: any) {
    const modal = await this.modal.create({
      component: TodoFormComponent,
      componentProps: { todo },
    });
    return await modal.present();
  }

}
