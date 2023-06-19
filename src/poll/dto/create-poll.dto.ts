export class CreatePollDto {
  question: string;
  options: { option: string; votes: number }[];

  constructor() {
    this.options = [{ option: '', votes: 0 }];
  }
}
