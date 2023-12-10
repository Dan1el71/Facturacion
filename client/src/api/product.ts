import axios from '../libs/axios'
import { InvoiceDetails } from '../types/types'

export const getProductById = async (id: number) => {
  return axios.get('/product/getProduct/' + id)
}

export const newInvoiceDetails = async (data: InvoiceDetails) => {
  return axios.post('/invoice/newInvoice', data)
}
