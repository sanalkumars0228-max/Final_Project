import { TestBed } from '@angular/core/testing';

import { AppoinmentServiice } from './appoinment-serviice';

describe('AppoinmentServiice', () => {
  let service: AppoinmentServiice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppoinmentServiice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
