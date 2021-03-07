import { CieloApi } from '../order/cielo'
import { CARDS } from './mock'

const cielo = new CieloApi({
  merchantId: 'c2b68f00-6f23-4712-9845-10ec4c5bf793', 
  merchantKey: 'OFCKANEHRDYLSAYIMHXFMCELJKVPZEEEGRWHHRBB',
  useSandbox: true
})

describe('Authorize', () => {
  // AUTORIZADO = SUCESSO
  it('[Autorizado com sucesso]', async () => {
    const res = await cielo.AUTHORIZE.byCrediCard('1', 100, CARDS.SUCESSO)
    expect(res.OK).toBe(true)
    expect(res.message).toBe('Compra autorizada com sucesso')
    expect(res.data?.paymentID).not.toBeUndefined()
  })

  it('[Não Autorizado]', async () => {
    const res = await cielo.AUTHORIZE.byCrediCard('1', 100, CARDS.NAO_AUTORIZADO)
    expect(res.OK).toBe(false)
    expect(res.message).toBe('Not Authorized')
    expect(res.data).toBeUndefined()
  })

  it('[Bloqueado]', async () => {
    const res = await cielo.AUTHORIZE.byCrediCard('1', 100, CARDS.BLOQUEADO)
    expect(res.OK).toBe(false)
    expect(res.message).toBe('Blocked Card')
    expect(res.data).toBeUndefined()
  })

  it('[Expirado]', async () => {
    const res = await cielo.AUTHORIZE.byCrediCard('1', 100, CARDS.EXPIRADO)
    expect(res.OK).toBe(false)
    expect(res.message).toBe('Card Expired')
    expect(res.data).toBeUndefined()
  })
  
  it('[Cancelado]', async () => {
    const res = await cielo.AUTHORIZE.byCrediCard('1', 100, CARDS.CANCELADO)
    expect(res.OK).toBe(false)
    expect(res.message).toBe('Card Canceled')
    expect(res.data).toBeUndefined()
  })
  
  it('[Timeout]', async () => {
    const res = await cielo.AUTHORIZE.byCrediCard('1', 100, CARDS.TIMEOUT)
    expect(res.OK).toBe(false)
    expect(res.message).toBe('Timeout')
    expect(res.data).toBeUndefined()
  })

  it('[Data de expiração inválida]', async () => {
    const res = await cielo.AUTHORIZE.byCrediCard('1', 100, CARDS.PROBLEMA.DATA_ERRADA)
    expect(res.OK).toBe(false)
    expect(res.message).toBe('Credit Card Expiration Date is invalid')
    expect(res.data).toBeUndefined()
  })
  // PARCELAMENTO 
  // PROBLEMAS COM CARTÃO 
  // - NÚMERO INVÁLIDO
  // - BANDEIRA NÃO ACEITA
})


describe('CAPTURE', () => {
  it('Sucesso', async () => {
    const res = await cielo.AUTHORIZE.byCrediCard('1', 100, CARDS.SUCESSO)
    const res2 = await cielo.CAPTURE.byPaymentID(res.data?.paymentID as string)

    expect(res2.OK).toBe(true)
    expect(res2.message).toBe('Pagamento efetuado com sucesso')
  })
})

describe('CANCEL', () => {
  it('Sucesso', async () => {
    const res = await cielo.AUTHORIZE.byCrediCard('1', 100, CARDS.SUCESSO)
    const res2 = await cielo.CAPTURE.byPaymentID(res.data?.paymentID as string)
    const res3 = await cielo.CANCEL.byPaymentID(res.data?.paymentID as string)

    expect(res3.OK).toBe(true)
    expect(res3.message).toBe('Pagamento cancelado com sucesso')
  })
})
