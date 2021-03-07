import { AxiosInstance } from 'axios'
import { Response } from '../../models/_response'
import { CaptureResponse } from './capture.model'

export default class CaptureModule {
  constructor(private request: AxiosInstance) {}
  
  async byPaymentID(id: string): Promise<Response<{}>> {
    try {
      const res = await this.request.put(`1/sales/${id}/capture`)
      const result: CaptureResponse = res.data
      const OK = result.Status === 2
      
      return { 
        OK, 
        message: OK ? 'Pagamento efetuado com sucesso' : result.ReturnMessage
      }
    } catch (error) {
      const message = error.response ? error.response.data[0].Message: 'Algo inesprado aconteceu'
      return { OK: false, message }
    }
  }
}