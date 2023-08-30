import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { DepositeComponent } from './deposite.component';
import { LoginservicesService } from '../loginservices.service';
import { of } from 'rxjs';

describe('DepositeComponent', () => {
  let component: DepositeComponent;
  let fixture: ComponentFixture<DepositeComponent>;
  let loginservice: LoginservicesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositeComponent ],
      imports: [ HttpClientTestingModule, MatSnackBarModule, RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositeComponent);
    component = fixture.componentInstance;
    loginservice = TestBed.inject(LoginservicesService);
    fixture.detectChanges();
  });

  it('should call summaryview() method on LoginservicesService', () => {
    const spy = spyOn(loginservice, 'summaryview').and.returnValue(of({}));
    component.ondeposit();
    expect(spy).toHaveBeenCalled();
  });
});
