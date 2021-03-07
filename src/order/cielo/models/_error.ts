export interface CieloError {
  Code: number; 
  Message: string;
}

const responseMessages: { [key: string]: string} = {
  '0' : 'Compra autorizada com sucesso',
  '4' : 'Sucesso',
  '6' : 'Sucesso',
  '05' : 'Error',
  '57' : 'Error',
  '70' : 'Error',
  '77' : 'Error',
  '78' : 'Cartão de crédito bloqueado',
  '99' : 'Error',
  '126': 'Data de expiração inválida'
}

const responseMessagesProd: { [key: string]: string} = {
  '0' : 'Compra autorizada com sucesso',
  '4' : 'Sucesso',
  '6' : 'Sucesso',
  '05' : 'Error',
  '57' : 'Error',
  '70' : 'Error',
  '77' : 'Error',
  '78' : 'Cartão de crédito bloqueado',
  '99' : 'Error',
  '126': 'Data de expiração inválida'
}

export function isAuthorizeOK(sandbox: boolean, code: string) {
  if (sandbox) {
    return code === '04' || code === '06'
  }

  return 
}

export function translateCieloStatus(code: string): string {
  const status = responseMessages[code]

  return status || 'Algo inesperado aconteceu'
}
