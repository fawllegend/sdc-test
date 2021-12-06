import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Observable, switchMap, tap } from "rxjs";

import { User, UserType } from "./_models/user.model";
import { UserService } from "./_services/user-mock.service";

export interface State {
  loading: boolean;
  users: User.Model[]
}

@Injectable()
export class AppStore extends ComponentStore<State> {
  constructor(private userService: UserService) {
    super();

    this.setState({
      users: [],
      loading: false,
    });

    // shows all state changes of the component
    this.state$.subscribe(console.log)
    this.load();
  }

  /**
   * Effects
   * */
  private readonly load = this.effect(
    (origin$: Observable<void>) =>
      origin$.pipe(
        tap(() => this.setLoading(true)),
        switchMap(() =>
          this.userService
            .getUsersMock()
            .pipe(
              tapResponse(
                (users: any) => {
                  this.setAllEntities({entities: users});
                },
                (error: Error) => {
                  console.error(error.message);
                },
                () => {
                  this.setLoading(false);
                }
              )
            )
        )
      )
  );

  /**
   * Updaters
  * */
  readonly setLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading,
  }));

  readonly setAllEntities = this.updater(
    (state, data: { entities: Array<User.Model> }) => ({
      ...state,
      users: this.aggregateData(data.entities)
    })
  );

  /**
   * Selectors
  * */
  readonly loading$ = this.select((state) => state.loading);
  readonly entities$ = this.select((state) => state.users);

  /**
   * Helpers
  * */
  aggregateData(data: any) {
    const nodes: User.Node[] = data.filter(
      (u) => u.type === UserType.USER_NODE
    );
    
    const links: User.Link[] = data.filter(
      (u) => u.type === UserType.USER_TO_USER_LINK
    );

    return links?.map((l) => ({
      node1: nodes.find(item => item.userId === l.node1),
      node2: nodes.find(item => item.userId === l.node2),
    }))
  }
}