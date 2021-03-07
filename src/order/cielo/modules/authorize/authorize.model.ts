import { CreditCard } from '../../models/_card'

export interface AuthorizeResponse {
  MerchantOrderId: string;
  Customer:        Customer;
  Payment:         Payment;
}

export interface Customer {
  Name: string;
}

export interface Payment {
  ServiceTaxAmount:  number;
  Installments:      number;
  Interest:          number;
  Capture:           boolean;
  Authenticate:      boolean;
  Recurrent:         boolean;
  CreditCard:        CreditCard;
  AuthenticationUrl: string;
  Tid:               string;
  ProofOfSale:       string;
  ReturnUrl:         string;
  Provider:          string;
  IsQrCode:          boolean;
  Amount:            number;
  ReceivedDate:      string;
  Status:            number;
  IsSplitted:        boolean;
  ReturnCode:        string;
  ReturnMessage?:    string;
  PaymentId:         string;
  Type:              string;
  Currency:          string;
  Country:           string;
  Links:             Link[];
}

export interface Link {
  Method: string;
  Rel:    string;
  Href:   string;
}

export class Authorization { 
  MerchantOrderId: string 
  Customer = { Name: '' } 
  Payment = { 
    Type: 'CreditCard', 
    Amount: 0, 
    Provider: 'Cielo',
    ReturnUrl: 'https://www.google.com.br',
    Installments: 1, 
    Authenticate : false,
    CreditCard: { 
      CardNumber: '', 
      Holder: '', 
      ExpirationDate: '', 
      SecurityCode: '', 
      Brand: '' 
    } 
  } 

  constructor(
    orderID: string,
    amount: number,
    card: CreditCard,
    devidedIn: number = 1
  ) {
    this.MerchantOrderId = orderID
    this.Customer.Name = card.Holder
    this.Payment.Amount = amount

    this.Payment.Installments = devidedIn
    this.Payment.CreditCard.CardNumber= card.CardNumber
    this.Payment.CreditCard.Holder = card.Holder
    this.Payment.CreditCard.ExpirationDate = card.ExpirationDate
    this.Payment.CreditCard.SecurityCode = card.SecurityCode || ''
    this.Payment.CreditCard.Brand = card.Brand || ''
  }
}

