import { TestBed } from '@angular/core/testing';

import { SectionBuilderService } from './section-builder.service';

describe('SectionBuilderService', () => {
  let service: SectionBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
