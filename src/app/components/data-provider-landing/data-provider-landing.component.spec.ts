import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataProviderLandingComponent } from './data-provider-landing.component';

describe('DataProviderLandingComponent', () => {
  let component: DataProviderLandingComponent;
  let fixture: ComponentFixture<DataProviderLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataProviderLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataProviderLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
