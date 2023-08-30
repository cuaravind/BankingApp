// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { of } from 'rxjs';
// import { UserloginComponent } from './userlogin.component';
// import { LoginservicesService } from '../loginservices.service';

// describe('UserloginComponent', () => {
//   let component: UserloginComponent;
//   let fixture: ComponentFixture<UserloginComponent>;
//   let loginServiceSpy: jest.SpyInstance<LoginservicesService>;

//   beforeEach(async () => {
//     const loginService = {
//       login: jest.fn(),
//       getTokenExpiration$: jest.fn().mockReturnValue(of(false)),
//       setAccessToken: jest.fn(),
//       decodedToken: null
//     };
//     await TestBed.configureTestingModule({
//       imports: [RouterTestingModule, MatSnackBarModule, HttpClientTestingModule],
//       declarations: [UserloginComponent],
//       providers: [{ provide: LoginservicesService, useValue: loginService }]
//     }).compileComponents();
//     loginServiceSpy = jest.spyOn(TestBed.inject(LoginservicesService), 'login');
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(UserloginComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should navigate to main page on onmain() method', () => {
//     const routerSpy = jest.spyOn(component.route, 'navigate');
//     component.onmain();
//     expect(routerSpy).toHaveBeenCalledWith(['/']);
//   });

//   it('should call login service and navigate to userpage on successful login', () => {
//     const response = { access_token: 'sample_token', token: 'sample_token' };
//     const decodedToken = { id: 'sample_id' };
//     loginServiceSpy.mockReturnValue(of(response));
//     component.loginService.decodedToken = decodedToken;
//     const routerSpy = jest.spyOn(component.route, 'navigate');
//     const snackSpy = jest.spyOn(component.snack, 'open');
//     localStorage.setItem = jest.fn();
//     component.login();
//     expect(loginServiceSpy).toHaveBeenCalled();
//     expect(snackSpy).toHaveBeenCalledWith('Login Successful', 'ok');
//     expect(localStorage.setItem).toHaveBeenCalledWith('token', response.access_token);
//     expect(component.loginService.setAccessToken).toHaveBeenCalledWith(response.token);
//     expect(component.decodedToken).toEqual(decodedToken);
//     expect(routerSpy).toHaveBeenCalledWith(['userpage']);
//   });

//   it('should show error message on unsuccessful login', () => {
//     loginServiceSpy.mockReturnValue(of(null));
//     const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
//     component.login();
//     expect(alertSpy).toHaveBeenCalledWith('emailid or password is wrong');
//     expect(component.ngOnInit).toHaveBeenCalled();
//   });

//   it('should handle error during login', () => {
//     loginServiceSpy.mockReturnValue(of(null, { status: 500 }));
//     const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
//     component.login();
//     expect(component.hashError).toBeTruthy();
//     expect(alertSpy).toHaveBeenCalledWith('Login failed');
//     expect(component.ngOnInit).toHaveBeenCalled();
//   });

//   it('should check for token expiration on initialization', () => {
//     const expiredSpy = jest.spyOn(component.loginService, 'getTokenExpiration$').mockReturnValue(of(true));
//     component.ngOnInit();
//     expect(expiredSpy).toHaveBeenCalled();
//   });
// });
