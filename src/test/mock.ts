import { CreditCard } from "../order/cielo/models/_card"

function cardFactory(numb?: string, expiration_at?: string, code?: string, brand?: string): CreditCard {
  return {
    CardNumber: numb || '0000000000000001',
    Holder: 'John Doe',
    ExpirationDate: expiration_at || '08/2021',
    SecurityCode: code || '123',
    Brand: brand || 'Visa'
  }
}

export const CARDS = {
  SUCESSO: cardFactory(),
  NAO_AUTORIZADO: cardFactory('0000000000000002'),
  EXPIRADO: cardFactory('0000000000000003'),
  BLOQUEADO: cardFactory('0000000000000005'),
  TIMEOUT: cardFactory('0000000000000006'),
  CANCELADO: cardFactory('000000000000007'),
  PROBLEMA: {
    // NUMERO_ERRADO: cardFactory('0000000000000009012'),
    DATA_ERRADA: cardFactory(undefined, '02/2020', ),
    // CVV_ERRADO: cardFactory(undefined, ''),
    BANDEIRA_NAO_SUPORTADA: cardFactory(undefined, undefined, undefined, 'Xinforinfola')
  },
}