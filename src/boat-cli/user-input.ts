import { QuestionSet, Question } from 'nest-commander';

@QuestionSet({ name: 'userInput' })
export class UserInput {
  @Question({
    type: 'input',
    name: 'commandName',
    message: 'Please enter a command',
  })
  commandName(val: string) {
    return val;
  }
}
