import { Injectable, NotFoundException } from '@nestjs/common';
import { Friend } from './friend.model';
import { FriendDto } from './friend.model';
import { friendSearchOptions } from './friend.model';
import { myDB } from './friend.horace.model';

@Injectable()
export class friendService {
  /**
   * Smart! You have a good guess to place a fake DB with the type here.
   */
  private friends: Friend[] = [
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
   * you may not specify the type of id (id: friendDto.id).
   * If you construct FriendDto in right way (use class-validator and class-transformer) and
   * already told to one of the route in your friend controller that the incoming request body
   * should be in the format of friendDto. The controller will reject the request if it doesnt fit the friendDto.
   */
  createFriend(friendDto: FriendDto) {
    const friend: Friend = { id: friendDto.id, ...friendDto };
    this.friends.push(friend);
    return friend;
    // searched up the ... feature, it copies all the properties from the Dto object into the friend object (id, name, sex, age, description)
    // searched up the .push() javascript method that adds on or more elements to the end of an array
  }

  /**
   * Are you sure to send a GET request to corresponding route? See what you define in your controller.
   */
  async findAll() {
    /**
     * remember I said, when we retrieve the data from DB, it will be a delay for these kind of operations.
     * We can simulate the delay behaviour like a real DB.
     * I create a friend.horace.model.ts to show this,
     * the class involves a little bit OOP concept (write a static class there), you can learn more about OOP if you want to.
     *
     * Using await keyword inside async function to waiting the result from our "DB".
     */
    return await myDB.findAll();

    return this.friends;
    // why does this not work when I send an insomnia request? It currently gives {} but it should just print my fake database no?
  }

  /**
   * This one is good. There is a situation that the friend is not found.
   * You should throw a not found exception to client.
   */

  /**
   * id should not be included in dto. Think about it, id actually is a unique identifier,
   * if you include id in the search option, there are only two cases.
   *
   * Case 1:
   * not found since we dont have a friend with a specific id you input.
   *
   * Case 2:
   * found a friend A with a specific id, but just one.
   * Even if there is a friend B with the same properties (the name starts with the letter “a”, sex or age) as same as friend A,
   * they also have different IDs.
   */
  findById(id: string) {
    const friend = this.friends.find((friend) => friend.id === parseInt(id));

    //Example to throw a exception with customized error message to client.
    if (!friend)
      throw new NotFoundException(`Your friend with id: ${id} not found.`);

    return friend;
  }

  /**
   * id should not be included in multiple search option, since the reason I mentioned above.
   *
   * The logic here is very great. I really love it.
   * Try to finish the age range feature by my hint in controller.ts
   */
  findByOption(options: friendSearchOptions) {
    const filteredFriends = this.friends.filter((friend) => {
      if (options.id && friend.id !== parseInt(options.id)) {
        return false;
      }
      if (
        options.name &&
        !friend.name.toLowerCase().includes(options.name.toLowerCase())
      ) {
        return false;
      }
      if (
        options.sex &&
        !friend.sex.toLowerCase().includes(options.sex.toLowerCase())
      ) {
        return false;
      }
      if (options.age && friend.age !== parseInt(options.age)) {
        return false;
      }
      return true;
    });
    return filteredFriends;
  }

  /**
   * id: string is required because client indicate which friend should be updated.
   * But, you need to define another dto for that request body.
   * Becasue the id should not be updated once a friend is created,
   * and the updating field like name, sex, age, description can be optional, but at least one.
   * If you found the updateFriendDto is empty, return a bad request exception with message to client.
   */
  updateFriend(id: string, friendDto: FriendDto) {
    const friend = this.friends.find((friend) => friend.id == parseInt(id));
    if (friend) {
      friend.name = friendDto.name || friend.name;
      friend.age = friendDto.age || friend.age;
      friend.description = friendDto.description || friend.description;
    }

    // Yes, return a updated info to client if successful,
    // but remember to return a not found exception to client if id is not correct.
    return friend;
  }

  /**
   * This one is also good.
   * Notice, return a updated friend list to client if successfully.
   * return a not found exception to client if a wrong name is provided.
   */
  deleteFriendByName(name: string) {
    const friendIndex = this.friends.findIndex(
      (friend) => friend.name.toLowerCase() == name.toLowerCase(),
    );
    if (friendIndex !== -1) {
      const deletedFriend = this.friends.splice(friendIndex, 1)[0];
      return deletedFriend;
    } else {
      return null;
    }
  }
}
