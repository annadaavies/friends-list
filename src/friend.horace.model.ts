import { Friend } from './friend.model';

export class myDB {
  private static friends: Friend[] = [
    { id: 1, name: 'Mary', sex: 'Female', age: 21, description: 'Best friend' },
    { id: 2, name: 'Tim', sex: 'Male', age: 26, description: 'Old friend' },
    { id: 3, name: 'Zoe', sex: 'Female', age: 19, description: 'Close friend' },
    {
      id: 4,
      name: 'Zach',
      sex: 'Male',
      age: 20,
      description: 'Really close friend',
    },
    { id: 5, name: 'Emma', sex: 'Female', age: 23, description: 'New friend' },
  ];

  /**
   * Its saying that the function return a promise with a friend list (array) after 2 second (2000 milliseconds)
   */
  public static findAll(): Promise<Friend[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // return back some value when resolve a promise (after 2 second).
        resolve(this.friends);
      }, 2000);
    });
  }
}
