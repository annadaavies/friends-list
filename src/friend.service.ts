import { Injectable } from '@nestjs/common';
import { Friend } from './friend.model';
import { FriendDto } from './friend.model';

@Injectable()
export class friendService {
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

  createFriend(friendDto: FriendDto) {
    const friend: Friend = { id: friendDto.id, ...friendDto };
    this.friends.push(friend);
    return friend;
    // searched up the ... feature, it copies all the properties from the Dto object into the friend object (id, name, sex, age, description)
    // searched up the .push() javascript method that adds on or more elements to the end of an array
  }

  findAll() {
    return this.friends;
    // why does this not work when I send an insomnia request? It currently gives {} but it should just print my fake database no?
  }

  findById(id: string) {
    const friend = this.friends.find((friend) => friend.id === parseInt(id));
    return friend;
  }

  //findByOption(options: friendSearchOptions){
  //ask for help: struggling on this feature (identifying if they match the 'database' etc.)
  //}

  updateFriend(id: string, friendDto: FriendDto) {
    const friend = this.friends.find((friend) => friend.id == parseInt(id));
    if (friend) {
      friend.name = friendDto.name || friend.name;
      friend.age = friendDto.age || friend.age;
      friend.description = friendDto.description || friend.description;
    }
    return friend;
  }

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
