import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistersecondphaseComponent } from './registersecondphase.component';

describe('RegistersecondphaseComponent', () => {
  let component: RegistersecondphaseComponent;
  let fixture: ComponentFixture<RegistersecondphaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistersecondphaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistersecondphaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
