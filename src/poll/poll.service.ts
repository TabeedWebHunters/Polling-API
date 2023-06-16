import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Poll } from './entities/poll.entity';
import { CreatePollDto } from './dto/create-poll.dto';

@Injectable()
export class PollService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL; // Replace with your Supabase URL
    const supabaseKey = process.env.SUPABASE_KEY;
    console.log(supabaseKey);
    console.log(supabaseUrl);
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async create(createPollDto: CreatePollDto): Promise<Poll> {
    const { data, error } = await this.supabase.from('polls').insert(createPollDto).single();

    if (error || !data) {
      throw new Error(`Failed to create poll: ${error?.message}`);
    }

    return data as Poll;
  }

  async findAll(): Promise<Poll[]> {
    const { data, error } = await this.supabase.from('polls').select('*');

    if (error) {
      throw new Error(`Failed to fetch polls: ${error.message}`);
    }

    return data ?? [];
  }

  async findOne(id: string): Promise<Poll> {
    const { data, error } = await this.supabase
      .from('polls')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException('Poll not found');
    }

    return data;
  }

  async update(id: string, updatePollDto: CreatePollDto): Promise<Poll> {
    const { data, error } = await this.supabase
      .from('polls')
      .update(updatePollDto)
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException('Poll not found');
    }

    return data as Poll;
  }

  async remove(id: string): Promise<Poll> {
    const { data, error } = await this.supabase
      .from('polls')
      .delete()
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException('Poll not found');
    }

    return data as Poll;
  }

  async vote(id: string, option: string): Promise<Poll> {
    const { data: pollData, error: pollError } = await this.supabase
      .from('polls')
      .select('*')
      .eq('id', id)
      .single();

    if (pollError || !pollData) {
      throw new NotFoundException('Poll not found');
    }

    const poll = pollData as Poll;
    console.log(poll);

    const selectedOption = poll.options.find((opt) => opt.option === option);
    if (!selectedOption) {
      throw new NotFoundException('Option not found');
    }
    console.log(selectedOption);

    selectedOption.votes += 1;
    poll.totalVotes += 1;
    console.log(poll);

    const { data: updatedPollData, error: updateError } = await this.supabase
      .from('polls')
      .update(poll)
      .eq('id', id)
      .single();

    if (updateError || !updatedPollData) {
      throw new Error(`Failed to update poll: ${updateError?.message}`);
    }

    return updatedPollData as Poll;
  }

  async getWinner(id: string): Promise<{ option: string; votes: number }> {
    const { data, error } = await this.supabase
      .from('polls')
      .select('options')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException('Poll not found');
    }

    const poll = data as Poll;
    let maxVotes = 0;
    let winnerOption = '';

    for (const option of poll.options) {
      if (option.votes > maxVotes) {
        maxVotes = option.votes;
        winnerOption = option.option;
      }
    }

    return { option: winnerOption, votes: maxVotes };
  }
}
