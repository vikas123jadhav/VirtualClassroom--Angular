import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyCreationComponent } from './faculty-creation.component';

describe('FacultyCreationComponent', () => {
  let component: FacultyCreationComponent;
  let fixture: ComponentFixture<FacultyCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
