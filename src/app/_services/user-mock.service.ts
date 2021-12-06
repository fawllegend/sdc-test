import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const data = [
  {
    userId: 1,
    name: 'a',
    type: 'user_node',
  },
  {
    userId: 2,
    type: 'user_node',
    name: 'b',
  },
  {
    userId: 3,
    type: 'user_node',
    name: 'c',
  },
  {
    userId: 4,
    type: 'user_node',
    name: 'd',
  },
  {
    type: 'user_to_user_link',
    node1: 1,
    node2: 2,
  },
  {
    type: 'user_to_user_link',
    node1: 2,
    node2: 3,
  },
  {
    type: 'user_to_user_link',
    node1: 3,
    node2: 4,
  },
  {
    type: 'user_to_user_link',
    node1: 4,
    node2: 1,
  },
];

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor() {}

  getUsersMock() {
    return of(data);
  }
}
