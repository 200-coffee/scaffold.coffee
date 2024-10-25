import { Answers } from 'prompts';

export type tScaffoldAnswers = Answers<
  'name' | 'overwrite' | 'framework' | 'language' | 'styling' | 'testing' | 'ui' | 'git' | 'install'
>

// export type tScaffoldAnswers = Answers<
//   'name' | 'overwrite' 
// >