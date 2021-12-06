export namespace User {
  
  export interface Node {
    userId: number;
    name: string;
    type: UserType.USER_NODE;
  }

  export interface Link {
    node1: number;
    node2: number;
    type: UserType.USER_TO_USER_LINK;
  }

  export interface Model {
    node1: Node | null;
    node2: Node | null;
  }

}

export enum UserType {
  USER_NODE = 'user_node',
  USER_TO_USER_LINK = 'user_to_user_link',
}
