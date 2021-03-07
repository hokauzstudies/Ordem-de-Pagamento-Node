import axios, { AxiosInstance } from 'axios'

import AuthorizeModule from './modules/authorize'
import CaptureModule from './modules/capture'
import CancelModule from './modules/cancel'

interface Ambient {
  request: string
  consult: string
}

interface Params {
  merchantId: string
  merchantKey: string
  useSandbox?: boolean
}

export class CieloApi {
   // private consult: AxiosInstance
   private request: AxiosInstance
  
   private headers = {
     MerchantKey: '',
     MerchantId: '', 
     'Content-Type': 'application/json', 
  }

  AUTHORIZE: AuthorizeModule
  CAPTURE: CaptureModule
  CANCEL: CancelModule

  constructor(params: Params) {
    // Set Headers
    this.headers.MerchantId = params.merchantId
    this.headers.MerchantKey = params.merchantKey
    
    // Create Instances
    const urls = this.setAmbient(params.useSandbox)
    // this.consult = axios.create( { baseURL: urls.consult, headers: this.getHeaders() } )
    this.request = axios.create( { baseURL: urls.request, headers: this.headers } )
    
    this.AUTHORIZE = new AuthorizeModule(this.request)
    this.CAPTURE = new CaptureModule(this.request)
    this.CANCEL = new CancelModule(this.request)
  }
  
  private setAmbient(useSandbox?: boolean): Ambient {
    return useSandbox 
      ? {
        request: 'https://apisandbox.cieloecommerce.cielo.com.br',
        consult: 'https://apiquerysandbox.cieloecommerce.cielo.com.br'
      }
      : {
        request: 'https://api.cieloecommerce.cielo.com.br/',
        consult: 'https://apiquery.cieloecommerce.cielo.com.br/'
      }
  }
}
