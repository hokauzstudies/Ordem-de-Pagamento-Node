import axios from 'axios'
import { CieloApi }from 'cielo-api'

const cielo = new CieloApi.Cielo({
  merchantId: 'c2b68f00-6f23-4712-9845-10ec4c5bf793',
  merchantKey: 'OFCKANEHRDYLSAYIMHXFMCELJKVPZEEEGRWHHRBB',
  isSandBox: true // Opcional - Ambiente de Testes
})

try {
  cielo.createTokenizedCard({
    CustomerName: 'Paulo Henrique',
    CardNumber: '5344470265372895',
    Holder: 'Teste Holder',
    ExpirationDate:'12/2018',
    Brand:"Visa"
  })
  .then(res => console.log('res', res))
  .catch(e => console.log('Error', e.response.data[0]))
} catch (error) {
  // console.log(error)
}
