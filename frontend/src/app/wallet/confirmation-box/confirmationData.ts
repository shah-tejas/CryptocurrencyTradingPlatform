import { WalletHistory } from 'src/app/models/wallet-history';

// Interface to save the confirmation data
export interface ConfirmationData {
  confirm: boolean;
  action: string;
  walletTransaction: WalletHistory;
}
