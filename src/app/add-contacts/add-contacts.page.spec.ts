import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddContactsPage } from './add-contacts.page';

describe('AddContactsPage', () => {
  let component: AddContactsPage;
  let fixture: ComponentFixture<AddContactsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddContactsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddContactsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
