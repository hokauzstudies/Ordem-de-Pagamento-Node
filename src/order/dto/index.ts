import { Order, OrderStatus, Response } from '../entities';

const MOCK: Order = {
  id : '1',
  serviceID: '1',
  scheduleID: '1', 
  value: 100,
  status: OrderStatus.PENDENTE,
  description: 'Consulta oftamolofica'
}

export class OrderDTO {
  static async create(order: Order) {
    return {OK : true, data: MOCK }
  }

  static async get(id: string): Promise<Response<Order>> {
    return {
      OK: true, 
      data: MOCK
    }
  }

  static update(order: Order) {
    return { OK: true, data: order }
  }
}
