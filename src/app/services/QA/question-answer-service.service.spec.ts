import { TestBed } from '@angular/core/testing';

import { QuestionAnswerServiceService } from './question-answer-service.service';

describe('QuestionAnswerServiceService', () => {
  let service: QuestionAnswerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionAnswerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
