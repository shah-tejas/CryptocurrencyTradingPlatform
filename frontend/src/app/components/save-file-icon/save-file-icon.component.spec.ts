import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveFileIconComponent } from './save-file-icon.component';

describe('SaveFileIconComponent', () => {
  let component: SaveFileIconComponent;
  let fixture: ComponentFixture<SaveFileIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveFileIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveFileIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
