/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HeadmasterService } from './headmaster.service';

describe('Service: HeadmasterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeadmasterService]
    });
  });

  it('should ...', inject([HeadmasterService], (service: HeadmasterService) => {
    expect(service).toBeTruthy();
  }));
});
