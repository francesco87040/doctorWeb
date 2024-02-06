import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookreservationPage } from './bookreservation.page';

describe('BookreservationPage', () => {
  let component: BookreservationPage;
  let fixture: ComponentFixture<BookreservationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BookreservationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
