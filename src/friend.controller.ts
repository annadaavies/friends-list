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
