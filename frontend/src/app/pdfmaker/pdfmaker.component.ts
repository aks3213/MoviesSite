import { Component, OnInit } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class Invoice{
  Name: string;
  CurrentCity:string;
  Current2ndCity:string;
  contactNo: number;
  email: string;

  YearOfCompletionItermediate:number;
  BoardItermediate:string;
  PerformanceItermediate:number;
  SchoolNameItermediate:string;

  StreamMatriculation:string;
  SchoolNameMatriculation:string;
  YearOfCompletionMatriculation:number;
  BoardMatriculation:string;
  PerformanceMatriculation:number;

}

@Component({
  selector: 'app-pdfmaker',
  templateUrl: './pdfmaker.component.html',
  styleUrls: ['./pdfmaker.component.scss']
})
export class PdfmakerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  invoice = new Invoice(); 
  
  generatePDF(action = 'open') {
    let docDefinition = {
      content: [
        {
          text: 'RESUME',
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'Personal Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text:`Name : ${this.invoice.Name}` ,
                bold:true,
                alignment: 'right'
              },
              { text:`${this.invoice.CurrentCity},${this.invoice.Current2ndCity}`,
                alignment: 'right' },
              { text: this.invoice.email,
                alignment: 'right' },
              { text: this.invoice.contactNo ,
                alignment: 'right'},
              {
                  text: `Date: ${new Date().toLocaleString()}`,
                  alignment: 'right'
                }
            ],
          ]
        },
        {
          text:''
        },
        {
          text: 'Educational Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text:'Intermidiate',
                bold:true
              },
              {
                text:`Year of Completion : ${this.invoice.YearOfCompletionItermediate}`
              },
              { 
                text:`Board : ${this.invoice.BoardItermediate}`
              },
              { 
                text:`Performance : ${this.invoice.PerformanceItermediate}`
              },
              { 
                text: `Name of the School : ${this.invoice.SchoolNameItermediate}` ,
              },
              {
                text:''
              },
              {
                text:'Secondary',
                bold:true
              },
              {
                text:`Year of Completion : ${this.invoice.YearOfCompletionMatriculation}`
              },
              { 
                text:`Stream : ${this.invoice.StreamMatriculation}`
              },
              { 
                text:`Board : ${this.invoice.BoardMatriculation}`
              },
              { 
                text:`Performance : ${this.invoice.PerformanceMatriculation}`
              },
              { 
                text: `Name of the School : ${this.invoice.SchoolNameMatriculation}` ,
              }
            ],
          ]
        }
      ],       
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]          
        }
      }
    };

    if(action==='download'){
      pdfMake.createPdf(docDefinition).download();
    }else if(action === 'print'){
      pdfMake.createPdf(docDefinition).print();      
    }else{
      pdfMake.createPdf(docDefinition).open();      
    }

  }
}
