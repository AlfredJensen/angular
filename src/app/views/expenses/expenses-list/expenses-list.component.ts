import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ExcelService } from "src/app/core/services/excel.service";
import { ExpenseService } from "src/app/core/services/expense.service";
import { PDFService } from "src/app/core/services/pdf.service";
import {ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl } from "@angular/forms";
import Swal from "sweetalert2";
import { ViewEncapsulation } from '@angular/core';
import { Subject } from "rxjs";
import { WarehouseService } from "../../../core/services/warehouse.service";
import{ExpenseCategoriesService}from '../../../core/services/expense-categories.service';
import {ExpenceModel  } from '../expenceModel';
@Component({
  selector: "app-expenses-list",
  templateUrl: "./expenses-list.component.html",
  styleUrls: ["./expenses-list.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class ExpensesListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild("table") table: ElementRef;
  isLoader = false;
  expenses: any = [];
  search: any;
  closeModal: string;
  closeResult: string = '';
  deletedCount: any = 0;
  warehouseData:any=[];
  expenceCategoryData=[];
  searchdata: ExpenceModel={} as any;
    date:string;
    reference:string;
    optionSelectedwarehouse:any;
    expenseCategory:any;
 
  constructor(
    private expenseService: ExpenseService,
    private excelService: ExcelService,
    private pdfService: PDFService,
    private modalService: NgbModal,
    private warehouseService:WarehouseService,
    private expenseCategoriesService:ExpenseCategoriesService,
      ) {}
  open(content:any) {
    this.modalService.open(content, { windowClass: 'b-sidebar shadow b-sidebar-right bg-white text-dark'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  ngOnInit(): void {
    this.dtOptions = {
      retrieve: true,
      paging: false,
      searching: false
    };
    this.getAllExpenses();
    this.getAllWarehouse();
    this.getAllExpenceCategory();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  getAllExpenses() {
    this.isLoader = true;
    this.expenseService.getAllExpenses().subscribe(
      (response) => {
        console.log("warehouses", response);
        this.expenses=[];
        this.isLoader = false;
        this.dtTrigger.next();
        response.forEach((x) => {
          x.checkbox = false;
          this.expenses.push(x);
        });
        // this.expenses = response;
      },
      (error) => {
        this.isLoader = false;
        Swal.fire("Error occured while retrieving the list", "", "error");
      },
    );
  }
  getAllWarehouse() {
    this.warehouseService.getAllWarehouses().subscribe(
      (response) => {
        if (response) {
          this.warehouseData = response;
        }
      },
      (error) => {

        Swal.fire("Error occured while retrieving the list", "", "error");
      },
    );
  }
  getFilteredData(e) {
    this.isLoader = true;
    if(e.target.tagName=='INPUT'){
      this.search = e.target.value;
      this.searchdata.searchString = this.search ? this.search : '';
      if(this.searchdata.searchString==''){
        this.getAllExpenses();
        return;
      }
    }
    this.searchdata.searchString = this.searchdata.searchString ? this.searchdata.searchString : '';
    this.searchdata.date = this.date ? this.date : '';
    this.searchdata.reference = this.reference ? this.reference : '';
    this.searchdata.warehouseName = this.optionSelectedwarehouse ? this.optionSelectedwarehouse : '';
    this.searchdata.expenseCategory = this.expenseCategory ? this.expenseCategory : '';
    this.expenseService.GetFilterExpense(this.searchdata.searchString,this.searchdata.date, this.searchdata.reference, this.searchdata.warehouseName, this.searchdata.expenseCategory).subscribe(
        (response) => {
          if (response) {
            console.log("asdfasdf",response);
            //this.total = response.Total;
            this.expenses = [];
            this.expenses = response;
  
            this.expenses.forEach(x => {
              x.checkbox = false;
            });
  
            this.isLoader = false;
          }
        },
        (error) => {
          this.isLoader = false;
          Swal.fire("Error occured while retrieving the list", "", "error");
        },
      );
  }
  ResetExpenceData() {
    this.search = '';
    this.date = '';
    this.reference = '';
    this.expenseCategory='';
    this.optionSelectedwarehouse= '';
    // this.modalService.dismissAll();
    this.getAllExpenses();

  }
  getAllExpenceCategory() {
    this.expenseCategoriesService.getAllExpenseCategories().subscribe(
      (response) => {
        if (response) {
          this.expenceCategoryData = response;
        }
      },
      (error) => {

        Swal.fire("Error occured while retrieving the list", "", "error");
      },
    );
  }
  delete(expense) {
    Swal.fire({
      title: "Do you want to delete the expense?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.isLoader = true;
        this.expenseService.deleteExpenseById(expense.id).subscribe(
          (response) => {
            Swal.fire("Expense deleted successfully", "", "success");
            this.getAllExpenses();
          },
          (err) => {
            Swal.fire("Error occured while deleting the expense", "", "error");
          },
        );
      } else if (result.isDenied) {
      }
    });
  }
  
  DeleteMultipleExpense() {
    Swal.fire({
  title: "Do you want to delete the product?",
  showCancelButton: true,
  confirmButtonText: "Delete",
  denyButtonText: `Cancel`,
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    var ids = [];
    $.each(this.expenses,function(i,obj) {
        if(obj.checkbox)
          ids.push(obj.id);
    });
    this.isLoader = true;
    this.expenseService.DeleteMultipleExpense(ids).subscribe(
      (response) => {
        if(response)
        {
          this.getAllExpenses();
          this.isLoader = false;
        }
      },
      (error) => {
        this.isLoader = false;
        Swal.fire("Error occured while deleting!", "", "error");
      },
    );
    Swal.fire("Deleted!", "", "success");
  } else if (result.isDenied) {
  }
});
}
  
  printExcel() {
    this.excelService.exportAsExcelFile(this.expenses, "expenses");
  }
  printPDF() {
    this.pdfService.printPDF(this.table.nativeElement, "expenses");
  }
  
  checkAll(e) {
    console.log(e);
    if(e) {
      document.body.classList.add("checkAllbox");
    } 
    else
    {
      document.body.classList.remove("checkAllbox");
    }
    this.expenses.forEach((x) => {
      x.checkbox = e;
    });
  }
  
  checkSingle(i) {
    if(i) {
      document.body.classList.add("checkAllbox");
    } 
    else if("")
    {
      document.body.classList.remove("checkAllbox");
    }
    this.expenses[i].checkbox = !this.expenses[i].checkbox;
    var totalCount = 0
    $.each(this.expenses,function(i,obj) {
      if(obj.checkbox)
        totalCount++;
    });
    this.deletedCount=totalCount;
  }

}
