// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportQuestion from '../../../app/model/question';
import ExportQuestionOption from '../../../app/model/questionOption';
import ExportTest from '../../../app/model/test';
import ExportTestContent from '../../../app/model/testContent';
import ExportUser from '../../../app/model/user';

declare module 'sequelize' {
  interface Sequelize {
    Question: ReturnType<typeof ExportQuestion>;
    QuestionOption: ReturnType<typeof ExportQuestionOption>;
    Test: ReturnType<typeof ExportTest>;
    TestContent: ReturnType<typeof ExportTestContent>;
    User: ReturnType<typeof ExportUser>;
  }
}
