import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { PollService } from './poll.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { VoteDto } from './dto/vote.dto';;

@Controller('poll')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Post()
  create(@Body() createPollDto: CreatePollDto) {
    return this.pollService.create(createPollDto);
  }

  @Get()
  findAll() {
    return this.pollService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pollService.findOne(id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pollService.remove(id);
  }

  @Put(':id/vote')
  vote(@Param('id') id: string, @Body() voteDto: VoteDto) {
    return this.pollService.vote(id, voteDto.option);
  }

  @Get(':id/winner')
  getWinner(@Param('id') id: string) {
    return this.pollService.getWinner(id);
  }
}
