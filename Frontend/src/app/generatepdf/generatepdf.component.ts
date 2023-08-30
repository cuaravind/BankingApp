import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { LoginservicesService } from '../loginservices.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-generatepdf',
  templateUrl: './generatepdf.component.html',
  styleUrls: ['./generatepdf.component.css']
})
export class GeneratepdfComponent {
  data:any;
  depositAmount: number = 0;
  startDate = new Date();
  endDate = new Date();
  formGroup!: FormGroup;


  constructor(private user:LoginservicesService,private router:Router,private route:ActivatedRoute,private http:HttpClient ,private formBuilder: FormBuilder){
    // this.startDate=new Date();
    // this.endDate=new Date();
  }
  ngOnInit():void{
    this.formGroup = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });

  }

  onview() {
    const datePipe = new DatePipe('en-US');
    const startDate = new Date(this.formGroup.value.startDate);
    const formattedStartDate = startDate.toISOString().substring(0, 10);
    const endDate = new Date(this.formGroup.value.endDate);
    const formattedEndDate = endDate.toISOString().substring(0, 10);
    const params = new HttpParams()
      .set('start_date', formattedStartDate)
      .set('end_date', formattedEndDate);
    const id = this.user.deposit();
    return this.http
      .get(`http://localhost:5000/transadate/${id}`, { params })
      .subscribe((data) => {
        this.data = data;
        console.log(this.data);
      });
  }
@ViewChild('content', { static: false }) el!: ElementRef;

makePDF() {
  let pdf = new jsPDF('p', 'pt', 'a4');

  pdf.setFontSize(20);
  pdf.text("TRANSACTION RECEIPT", 180, 30);


  const options = {
    startY: 60
  };
  (<any>pdf).autoTable({
    html: '#content table',
    startY: 60,
    margin: { top: 50 },
    styles: {
      fontSize: 12,
      font: "helvetica",
      cellPadding: 8,
      minCellHeight: 20
    },
    headStyles: {
      fillColor: [25, 118, 210],
      textColor: 255,
      halign: 'center'
    },
    bodyStyles: {
      halign: 'center'
    }
  });

  pdf.save("Transaction_Details_date.pdf");
}
}
