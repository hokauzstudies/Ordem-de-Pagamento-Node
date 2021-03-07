import { CieloApi } from './cielo'
import { Response } from './cielo/models/_response'
import { OrderDTO } from './dto'
import { Order, OrderStatus } from './entities'

export default class OrderController {
  private cielo = new CieloApi({
    merchantId: process.env.CIELO_API_MERCHANT_ID as string, 
    merchantKey: process.env.CIELO_API_MERCHANT_KEY as string,
    useSandbox: !!process.env.CIELO_API_USE_SANDBOX
  })
  
  async create(serviceID: string, scheduleID: string, value: number) {
    const order = new Order(serviceID, scheduleID, value)
    const res = await OrderDTO.create(order)
    return res
  }

  async payWithCreditCard(orderID: string, card: any) {
    const order = await OrderDTO.get(orderID)
    if (!order.OK) {
      return { OK:false, message: 'Ordem de pagamento não encontrada!' }
    }
    
    const authorized = await this.cielo.AUTHORIZE.byCrediCard(orderID, order.data?.value as number, card)
    if (!authorized.OK) {
      return authorized
    }

    // Ação que realmente efetua a compra
    const capture = await this.cielo.CAPTURE.byPaymentID(authorized.data?.paymentID as string)
    if (!capture.OK) {
      return capture
    }

    return { OK: true, message: `Ordem de pagamento de ${order.data?.description} foi paga com sucesso!` }
  }

  async cancel(orderID: string): Promise<Response<any>> {
    const order = await OrderDTO.get(orderID)
    if (!order.OK) {
      return { OK:false, message: 'Ordem de pagamento não encontrada!' }
    }

    // TODO: verificar regras de negócio que definam quando um pagamento pode ser cancelado
    if (order.data?.paymentID) {
      const res = await this.cielo.CANCEL.byPaymentID(order.data?.paymentID as string)
      if (!res.OK) {
        return { OK: false, message: res.message }
      }
    }

    const newOrder: Order = { ...(order.data as Order), status: OrderStatus.CANCELADO }

    OrderDTO.update(newOrder)
    return { OK: true, message: `Order de pagamento de ${order.data?.description} foi cancelada com sucesso!` }
  }
}