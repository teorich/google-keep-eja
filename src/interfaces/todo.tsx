export interface Todo {
  id?: string | number;
  title?: string;
  notes?: Array<string>;
}

export enum TodoActionKind {
  CREATE = 'CREATE',
  DELETE = 'DELETE',
  UPDATE = 'UPDATE',
  RESHUFFLE = 'RESHUFFLE',
}
