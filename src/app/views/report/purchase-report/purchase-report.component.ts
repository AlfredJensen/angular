import { Component, OnInit } from "@angular/core";
import { PurchaseService } from "src/app/core/services/purchase.service";
import { SalesService } from "src/app/core/services/sales.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-purchase-report",
  templateUrl: "./purchase-report.component.html",
  styleUrls: ["./purchase-report.component.scss"],
})
export class PurchaseReportComponent implements OnInit {
  isLoader = false;
  purchaseReports: any = [
    {
      id: "string",
      user_id: "string",
      ref: "string",
      date: "string",
      provider_id: "string",
      warehouse_id: "string",
      tax_rate: 0,
      taxNet: 0,
      discount: 0,
      shipping: 0,
      grandTotal: 0,
      paid_amount: 0,
      statut: "string",
      payment_statut: "string",
      notes: "string",
      created_at: "string",
      updated_at: "string",
      deleted_at: "string",
    },
    {
      id: "string",
      user_id: "string",
      ref: "string",
      date: "string",
      provider_id: "string",
      warehouse_id: "string",
      tax_rate: 0,
      taxNet: 0,
      discount: 0,
      shipping: 0,
      grandTotal: 0,
      paid_amount: 0,
      statut: "string",
      payment_statut: "string",
      notes: "string",
      created_at: "string",
      updated_at: "string",
      deleted_at: "string",
    },
    {
      id: "string",
      user_id: "string",
      ref: "string",
      date: "string",
      provider_id: "string",
      warehouse_id: "string",
      tax_rate: 0,
      taxNet: 0,
      discount: 0,
      shipping: 0,
      grandTotal: 0,
      paid_amount: 0,
      statut: "string",
      payment_statut: "string",
      notes: "string",
      created_at: "string",
      updated_at: "string",
      deleted_at: "string",
    },
    {
      id: "string",
      user_id: "string",
      ref: "string",
      date: "string",
      provider_id: "string",
      warehouse_id: "string",
      tax_rate: 0,
      taxNet: 0,
      discount: 0,
      shipping: 0,
      grandTotal: 0,
      paid_amount: 0,
      statut: "string",
      payment_statut: "string",
      notes: "string",
      created_at: "string",
      updated_at: "string",
      deleted_at: "string",
    },
    {
      id: "string",
      user_id: "string",
      ref: "string",
      date: "string",
      provider_id: "string",
      warehouse_id: "string",
      tax_rate: 0,
      taxNet: 0,
      discount: 0,
      shipping: 0,
      grandTotal: 0,
      paid_amount: 0,
      statut: "string",
      payment_statut: "string",
      notes: "string",
      created_at: "string",
      updated_at: "string",
      deleted_at: "string",
    },
    {
      id: "string",
      user_id: "string",
      ref: "string",
      date: "string",
      provider_id: "string",
      warehouse_id: "string",
      tax_rate: 0,
      taxNet: 0,
      discount: 0,
      shipping: 0,
      grandTotal: 0,
      paid_amount: 0,
      statut: "string",
      payment_statut: "string",
      notes: "string",
      created_at: "string",
      updated_at: "string",
      deleted_at: "string",
    },
    {
      id: "string",
      user_id: "string",
      ref: "string",
      date: "string",
      provider_id: "string",
      warehouse_id: "string",
      tax_rate: 0,
      taxNet: 0,
      discount: 0,
      shipping: 0,
      grandTotal: 0,
      paid_amount: 0,
      statut: "string",
      payment_statut: "string",
      notes: "string",
      created_at: "string",
      updated_at: "string",
      deleted_at: "string",
    },
    {
      id: "string",
      user_id: "string",
      ref: "string",
      date: "string",
      provider_id: "string",
      warehouse_id: "string",
      tax_rate: 0,
      taxNet: 0,
      discount: 0,
      shipping: 0,
      grandTotal: 0,
      paid_amount: 0,
      statut: "string",
      payment_statut: "string",
      notes: "string",
      created_at: "string",
      updated_at: "string",
      deleted_at: "string",
    },
    {
      id: "string",
      user_id: "string",
      ref: "string",
      date: "string",
      provider_id: "string",
      warehouse_id: "string",
      tax_rate: 0,
      taxNet: 0,
      discount: 0,
      shipping: 0,
      grandTotal: 0,
      paid_amount: 0,
      statut: "string",
      payment_statut: "string",
      notes: "string",
      created_at: "string",
      updated_at: "string",
      deleted_at: "string",
    },
    {
      id: "string",
      user_id: "string",
      ref: "string",
      date: "string",
      provider_id: "string",
      warehouse_id: "string",
      tax_rate: 0,
      taxNet: 0,
      discount: 0,
      shipping: 0,
      grandTotal: 0,
      paid_amount: 0,
      statut: "string",
      payment_statut: "string",
      notes: "string",
      created_at: "string",
      updated_at: "string",
      deleted_at: "string",
    },
    {
      id: "string",
      user_id: "string",
      ref: "string",
      date: "string",
      provider_id: "string",
      warehouse_id: "string",
      tax_rate: 0,
      taxNet: 0,
      discount: 0,
      shipping: 0,
      grandTotal: 0,
      paid_amount: 0,
      statut: "string",
      payment_statut: "string",
      notes: "string",
      created_at: "string",
      updated_at: "string",
      deleted_at: "string",
    },
    {
      id: "string",
      user_id: "string",
      ref: "string",
      date: "string",
      provider_id: "string",
      warehouse_id: "string",
      tax_rate: 0,
      taxNet: 0,
      discount: 0,
      shipping: 0,
      grandTotal: 0,
      paid_amount: 0,
      statut: "string",
      payment_statut: "string",
      notes: "string",
      created_at: "string",
      updated_at: "string",
      deleted_at: "string",
    },
    {
      id: "string",
      user_id: "string",
      ref: "string",
      date: "string",
      provider_id: "string",
      warehouse_id: "string",
      tax_rate: 0,
      taxNet: 0,
      discount: 0,
      shipping: 0,
      grandTotal: 0,
      paid_amount: 0,
      statut: "string",
      payment_statut: "string",
      notes: "string",
      created_at: "string",
      updated_at: "string",
      deleted_at: "string",
    },
    {
      id: "string",
      user_id: "string",
      ref: "string",
      date: "string",
      provider_id: "string",
      warehouse_id: "string",
      tax_rate: 0,
      taxNet: 0,
      discount: 0,
      shipping: 0,
      grandTotal: 0,
      paid_amount: 0,
      statut: "string",
      payment_statut: "string",
      notes: "string",
      created_at: "string",
      updated_at: "string",
      deleted_at: "string",
    },
  ];
  constructor(private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    this.getAllPurchases();
  }
  getAllPurchases() {
    this.isLoader = true;
    this.purchaseService.getAllPurchases().subscribe(
      (response) => {
        console.log("purchaseReports", response);
        this.isLoader = false;
        // this.purchaseReports = response;
      },
      (error) => {
        this.isLoader = false;
        Swal.fire("Error occured while retrieving the list", "", "error");
      },
    );
  }
}
