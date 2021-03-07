import { AxiosInstance } from 'axios'
import { CreditCard } from '../../models/_card'
import { Response } from '../../models/_response'
import { Authorization, AuthorizeResponse } from './authorize.model'

export default class AuthorizeModule {
  constructor(private request: AxiosInstance) {}

  // async byToken(amount: number, token: string): Promise<Response<any>> {
  //   return { OK: true }
  // }
  
  async byCrediCard(orderID: string, amount: number, card: CreditCard): Promise<Response<{paymentID: string}>> {
    const data = new Authorization(orderID, amount, card)
    try {
      const res = await this.request.post('1/sales/', data)
      const result: AuthorizeResponse = res.data
      const OK = result.Payment.Status === 1
      
      return { 
        OK, 
        message: OK ? 'Compra autorizada com sucesso' : result.Payment.ReturnMessage,
        data: OK ? { paymentID: result.Payment.PaymentId } : undefined
      }
    } catch (error) {
      const message = error.response ? error.response.data[0].Message: 'Algo inesprado aconteceu'
      return { OK: false, message }
    }
  }
}