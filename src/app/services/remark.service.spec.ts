/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RemarkService } from './remark.service';

describe('Service: Remark', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemarkService]
    });
  });

  it('should ...', inject([RemarkService], (service: RemarkService) => {
    expect(service).toBeTruthy();
  }));
});
