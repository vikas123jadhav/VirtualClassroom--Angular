import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmChartsRecordComponent } from './arm-charts-record.component';

describe('ArmChartsRecordComponent', () => {
  let component: ArmChartsRecordComponent;
  let fixture: ComponentFixture<ArmChartsRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmChartsRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmChartsRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
