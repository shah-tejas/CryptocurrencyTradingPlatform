import { WalletHistory } from 'src/app/models/wallet-history';

export interface ConfirmationData {
  confirm: boolean;
  action: string;
  walletTransaction: WalletHistory;
}
