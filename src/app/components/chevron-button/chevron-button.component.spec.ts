import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChevronButtonComponent } from './chevron-button.component';

describe('ChevronButtonComponent', () => {
  let component: ChevronButtonComponent;
  let fixture: ComponentFixture<ChevronButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChevronButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChevronButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
