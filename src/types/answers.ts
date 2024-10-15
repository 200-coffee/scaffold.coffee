import { Answers } from 'prompts'

export type tScaffoldAnswers = Answers<
  'name' | 'overwrite' | 'framework' | 'language' | 'libraries'
>
