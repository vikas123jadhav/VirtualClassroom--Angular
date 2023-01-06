import { TestBed } from '@angular/core/testing';

import { FacultyGuardGuard } from './faculty-guard.guard';

describe('FacultyGuardGuard', () => {
  let guard: FacultyGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FacultyGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
