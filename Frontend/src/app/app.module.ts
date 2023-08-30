
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSnackBar} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserpageComponent } from './userpage/userpage.component';
import { DetailsComponent } from './details/details.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SummaryComponent } from './summary/summary.component';
import { DepositeComponent } from './deposite/deposite.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ViewtransactionComponent } from './viewtransaction/viewtransaction.component';
import { ThirdpartyComponent } from './thirdparty/thirdparty.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { TpttransferComponent } from './tpttransfer/tpttransfer.component';
import { AmountComponent } from './amount/amount.component';
import { GeneratepdfComponent } from './generatepdf/generatepdf.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    UserloginComponent,
    SignupComponent,
    UserpageComponent,
    DetailsComponent,
    HeaderComponent,
    HomepageComponent,
    SummaryComponent,
    DepositeComponent,
    TransactionComponent,
    ViewtransactionComponent,
    ThirdpartyComponent,
    AddComponent,
    UpdateComponent,
    TpttransferComponent,
    AmountComponent,
    GeneratepdfComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule


  ],
  providers: [MatSnackBar,AuthGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
