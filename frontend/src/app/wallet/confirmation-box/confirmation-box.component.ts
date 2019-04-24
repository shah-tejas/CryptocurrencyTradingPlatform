import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WalletHistory } from 'src/app/models/wallet-history';
import { ConfirmationData } from './confirmationData';

@Component({
  selector: 'app-confirmation-box',
  templateUrl: './confirmation-box.component.html',
  styleUrls: ['./confirmation-box.component.scss']
})
export class ConfirmationBoxComponent {

  Math = Math;
  walletTransaction: WalletHistory;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public confirmationData: ConfirmationData) {
    this.walletTransaction = this.confirmationData.walletTransaction;
    this.confirmationData.confirm = true;
  }

  // function to close the dialog box
  close(): void {
    this.dialogRef.close(null);
  }

}
