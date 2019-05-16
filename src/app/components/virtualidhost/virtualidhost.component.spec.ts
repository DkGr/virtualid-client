import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualidhostComponent } from './virtualidhost.component';

describe('VirtualidhostComponent', () => {
  let component: VirtualidhostComponent;
  let fixture: ComponentFixture<VirtualidhostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualidhostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualidhostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
