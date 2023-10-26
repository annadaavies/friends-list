import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { friendService } from './friend.service';
import { Friend } from './friend.model';
import { FriendDto } from './friend.model';
import { friendSearchOptions } from './friend.model';

@Controller('friends')
export class friendController {
  /**
   * if you want to learn more, google "dependency injection in Nestjs"
   * There is no problem in controller. The code is great.
   * Remember the DTO things I mentioned in friend.model.ts and friend.service.ts
   */
  constructor(private readonly friendService: friendService) {}

  @Post()
  createFriend(@Body() friendDto: FriendDto) {
    return this.friendService.createFriend(friendDto);
  }

  @Get()
  findAll() {
    return this.friendService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.friendService.findById(id);
  }

  /**
   * You can define a dto for @Query() options.
   * In dto, one of the filed can be like
   *
   * .
   * .
   * .
   * @IsOptional()
   * @IsNumber()
   * startAge: number;
   *
   * @IsOptional()
   * @IsNumber()
   * endAge: number;
   * .
   * .
   * .
   *
   * if client provide both thest query var to you, you can search the friends limited by a age range like: 16-25
   * if only startAge=16 provided, search the friends who age is greater than 16
   * if only endAge=25 provided, search the friends who age is lower than 25
   *
   * The name, sex feature work when you write a multi if-else statement there.
   * Try to finish the logic of this feature in service. I believe you can do it.
   */

  //Get('search')
  //findByOption(@Query() options: friendSearchOptions) {
  //return this.friendService.findByOption(options);
  //}

  //need help implementing age range feature

  @Patch(':id')
  updateFriend(@Param('id') id: string, @Body() friendDto: FriendDto) {
    return this.friendService.updateFriend(id, friendDto);
  }

  @Delete(':name')
  deleteFriendByName(@Param('name') name: string) {
    return this.friendService.deleteFriendByName(name);
  }
}
