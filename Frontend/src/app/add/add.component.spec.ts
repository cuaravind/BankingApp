import { AddComponent } from './add.component';
import { SignupservicesService } from '../signupservices.service';
import { LoginservicesService } from '../loginservices.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of } from 'rxjs';
describe('AddComponent', () => {
  let component: AddComponent;
  let register: SignupservicesService;
  let user: LoginservicesService;
  let route: Router;
  let snack: MatSnackBar;

  beforeEach(() => {
    register = {
      thirdparty: jest.fn().mockReturnValue(of({})),
    } as unknown as SignupservicesService;

    user = {
      deposit: jest.fn().mockReturnValue(1),
      decodedToken: {},
    } as unknown as LoginservicesService;

    route = {
      navigate: jest.fn(),
    } as unknown as Router;

    snack = {
      open: jest.fn(),
    } as unknown as MatSnackBar;

    component = new AddComponent(register, user, route, snack);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit form successfully', () => {
    const spy = jest.spyOn(component, 'onsubmit');

    component.data = {
      account_no: '1234567890',
      name: 'Test User',
      Bank_name: 'Test Bank',
      branch: 'Test Branch',
      IFSC_CODE: 'TEST1234',
      adder_id: '',
    };

    component.onsubmit();

    expect(spy).toHaveBeenCalled();
    expect(register.thirdparty).toHaveBeenCalledWith(
      1234567890,
      'Test User',
      'Test Bank',
      'Test Branch',
      'TEST1234',
      1
    );
    expect(snack.open).toHaveBeenCalledWith('Added Successfully', 'ok');
    expect(route.navigate).toHaveBeenCalledWith(['thirdparty']);
  });
});
