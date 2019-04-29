// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportQuestion from '../../../app/controller/question';
import ExportTest from '../../../app/controller/test';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    question: ExportQuestion;
    test: ExportTest;
    user: ExportUser;
  }
}
