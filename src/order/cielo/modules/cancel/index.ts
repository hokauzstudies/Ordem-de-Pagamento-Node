import { AxiosInstance } from 'axios'
import { Response } from '../../models/_response'

export default class CancelModule {
  constructor(private request: AxiosInstance) {}
  
  async byPaymentID(id: string): Promise<Response<{}>> {
    try {
      const res = await this.request.put(`1/sales/${id}/void`)
      
      return { 
        OK: res.status === 200, 
        message: 'Pagamento cancelado com sucesso' 
      }
    } catch (error) {
      const message = error.response ? error.response.data[0].Message: 'Algo inesprado aconteceu'
      return { OK: false, message }
    }
  }
}