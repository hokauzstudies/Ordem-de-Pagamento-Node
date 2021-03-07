export enum OrderStatus {
  PENDENTE = 'Pendente',
  CONFIRMADO = 'Confirmaddo',
  RECUSADO = 'Recusado',
  CANCELADO = 'Cancelado'
}

export default class Order {
  id: string
  method?: 'cartao' | 'boleto' | 'in-loco'
  paymentID?: string

  status: OrderStatus
  description: string

  constructor(
    public serviceID: string,
    public scheduleID: string,
    public value: number
  ) {
    // TODO: create a new unique id
    this.id = ''
    this.status = OrderStatus.PENDENTE
    this.description = ''
  }
}
