export interface CreditCard {
  CardNumber: string
  Holder: string
  ExpirationDate: string
  SecurityCode?: string
  Brand?: string
  SaveCard?: boolean
}