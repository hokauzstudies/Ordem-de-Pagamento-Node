export interface Response<T> {
  OK: boolean 
  data?: T
  message?: string
}
