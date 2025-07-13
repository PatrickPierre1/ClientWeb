import { api } from './api'
import type { Cliente } from '@/types/Cliente'

export async function getClientes(): Promise<Cliente[]> {
  const response = await api.get('/clients')
  return response.data
}

export async function getCliente(id: string): Promise<Cliente> {
  const response = await api.get(`/clients/${id}`)
  return response.data
}

export async function createCliente(cliente: Omit<Cliente, 'id'>): Promise<Cliente> {
  const response = await api.post('/clients', cliente)
  return response.data
}

export async function updateCliente(id: string, cliente: Omit<Cliente, 'id'>): Promise<Cliente> {
  const response = await api.put(`/clients/${id}`, cliente)
  return response.data
}

export async function deleteCliente(id: string): Promise<void> {
  await api.delete(`/clients/${id}`)
}
