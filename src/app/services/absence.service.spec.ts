/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AbsenceService } from './absence.service';

describe('Service: Absence', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbsenceService]
    });
  });

  it('should ...', inject([AbsenceService], (service: AbsenceService) => {
    expect(service).toBeTruthy();
  }));
});
