import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { PollService } from './poll.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { VoteDto } from './dto/vote.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('poll')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createPollDto: CreatePollDto) {
    return this.pollService.create(createPollDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.pollService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.pollService.findOne(id);
  }


  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.pollService.remove(id);
  }

  @Put(':id/vote')
  @UseGuards(AuthGuard('jwt'))
  vote(@Param('id') id: string, @Body() voteDto: VoteDto) {
    return this.pollService.vote(id, voteDto.option);
  }

  @Get(':id/winner')
  @UseGuards(AuthGuard('jwt'))
  getWinner(@Param('id') id: string) {
    return this.pollService.getWinner(id);
  }
}
