import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifcationsPage } from './notifcations-page';

describe('NotifcationsPage', () => {
  let component: NotifcationsPage;
  let fixture: ComponentFixture<NotifcationsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotifcationsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotifcationsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
