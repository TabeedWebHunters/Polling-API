import { Injectable } from '@nestjs/common';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
@Injectable()
export class UserService {
  private supabase: SupabaseClient;
  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL; 
    const supabaseKey = process.env.SUPABASE_KEY;
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async findAll(): Promise<User[]> {
    const { data: users, error } = await this.supabase
      .from('users')
      .select('*');
    if (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
    return users ?? [];
  }

  async findOne(id: number): Promise<User> {
    const { data: user, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    if (error || !user) {
      throw new Error(`User not found: ${error?.message}`);
    }
    if (!user) {
      return null; 
    }
    return user;
  }
  async findOneByEmail(email: string): Promise<User> {
    console.log(email);
    const { data: user, error } = await this.supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();
  if (error || !user) {
    throw new Error(`User not found: ${error?.message}`);
  }
  if (!user) {
    return null; 
  }
  return user
  }

  async create(user: User): Promise<User> {
    const {name, email, password}  = user;

    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = { ...user, password: hashPassword }; 
    
    const { data, error } = await this.supabase
      .from('users')
      .insert([newUser]);
    if (error || !data || data.length === 0) {
      throw new Error(`Failed to create user: ${error?.message}`);
    }
    return data[0];
  }

  async update(id: number, user: User): Promise<User> {
    const { data, error } = await this.supabase
      .from('users')
      .update(user)
      .eq('id', id);
    if (error || !data || data.length === 0) {
      throw new Error(`Failed to update user: ${error?.message}`);
    }
    return data[0];
  }

  async remove(id: number): Promise<User> {
    const { data, error } = await this.supabase
      .from('users')
      .delete()
      .eq('id', id);
    if (error || !data || data.length === 0) {
      throw new Error(`Failed to delete user: ${error?.message}`);
    }
    return data[0];
  }
}
