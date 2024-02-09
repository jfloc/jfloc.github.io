import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCountriesComponent } from './get-countries.component';

describe('GetCountriesComponent', () => {
  let component: GetCountriesComponent;
  let fixture: ComponentFixture<GetCountriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetCountriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
