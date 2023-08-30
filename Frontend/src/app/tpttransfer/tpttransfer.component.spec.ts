import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TpttransferComponent } from './tpttransfer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginservicesService } from '../loginservices.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

describe('TpttransferComponent', () => {
  let component: TpttransferComponent;
  let fixture: ComponentFixture<TpttransferComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TpttransferComponent ],
      providers: [ LoginservicesService ],
      imports: [ HttpClientTestingModule, RouterTestingModule, MatSnackBarModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpttransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the `data` property on initialization', () => {
    const user = TestBed.inject(LoginservicesService);
    const spy = spyOn(user, 'viewthirdparty').and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(component.data).toBeDefined();
  });

  it('should transfer amount to third-party account', () => {
    const user = TestBed.inject(LoginservicesService);
    const router = TestBed.inject(Router);
    const http = TestBed.inject(HttpClient);
    const snack = TestBed.inject(MatSnackBar);
    const spyDeposit = spyOn(user, 'deposit').and.returnValue(123);
    const spyHttp = spyOn(http, 'put').and.returnValue({ subscribe: () => {} });
    const spySnack = spyOn(snack, 'open');
    const spyRouter = spyOn(router, 'navigate');
    const transaction = { account_no: 456, amount: 100 };
    component.send(transaction);
    expect(spyDeposit).toHaveBeenCalled();
    expect(spyHttp).toHaveBeenCalledWith(`http://localhost:5200/thirdparty/transaction/123/456`, { amount: transaction.amount });
    expect(spySnack).toHaveBeenCalledWith('Transaction Successfull', 'ok');
    expect(spyRouter).toHaveBeenCalledWith(['thirdparty']);
  });
});

