export interface Friend {
  id: number;
  name: string;
  sex: string;
  age: number;
  description: string;
}

export interface FriendDto {
  id: number;
  name: string;
  sex: string;
  age: number;
  description: string;
}

export interface friendSearchOptions {
  id?: string;
  name?: string;
  sex?: string;
  age?: string;
}
