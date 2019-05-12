// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportQuestion from '../../../app/service/Question';
import ExportTest from '../../../app/service/Test';
import ExportTestContent from '../../../app/service/TestContent';
import ExportUser from '../../../app/service/User';

declare module 'egg' {
  interface IService {
    question: ExportQuestion;
    test: ExportTest;
    testContent: ExportTestContent;
    user: ExportUser;
  }
}
