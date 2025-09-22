 
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
 
@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './deposit.html',
  styleUrls: ['./deposit.scss']
})
export class DepositComponent implements OnInit {
  @Input() accountId: number = 0;
  token: string = '';
  amount: number = 0;
  statusMessage: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}
 
  ngOnInit() {
 
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
      console.log('🔐 Token received:', this.token);
    });
  }
 
  depositFunds() {
    alert(this.accountId)
    if (this.amount <= 0 || !this.accountId || !this.token) {
      this.statusMessage = '⚠️ Enter a valid amount and ensure account ID and token are set.';
      return;
    }
 
    const url = `http://localhost:8080/api/transactions/deposit/${this.accountId}?amount=${this.amount}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
 
    this.http.post(url,null,{ headers }).subscribe({
      next: (res: any) => {
        this.statusMessage = `✅ ₹${res.amount} deposited successfully into account ${res.account.accountNumber}.`;
      },
      error: (err) => {
        console.error('❌ Deposit failed:', err);
        this.statusMessage = `❌ Deposit failed: ${err.status} ${err.statusText}`;
      }
    });
  }
}
 