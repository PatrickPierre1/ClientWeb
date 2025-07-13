import { ref } from 'vue'
import type { Cliente } from '@/types/Cliente'
import {
  getClientes,
  getCliente,
  createCliente,
  updateCliente,
  deleteCliente,
} from '@/services/clienteService'

export function useClientes() {
  const clientes = ref<Cliente[]>([])
  const clienteSelected = ref<Cliente | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchClientes() {
    loading.value = true
    error.value = null
    try {
      clientes.value = await getClientes()
    } catch (err: any) {
      error.value = 'Erro ao carregar clientes'
      console.log(err)
    } finally {
      loading.value = false
    }
  }

  async function fetchCliente(id: string) {
    loading.value = true
    error.value = null
    try {
      clienteSelected.value = await getCliente(id)
    } catch (err: any) {
      error.value = 'Erro ao carregar cliente'
      console.log(err)
    } finally {
      loading.value = false
    }
  }

  async function addCliente(cliente: Omit<Cliente, 'id'>) {
    loading.value = true
    error.value = null
    try {
      const newCliente = await createCliente(cliente)
      clientes.value.push(newCliente)
    } catch (err: any) {
      error.value = 'Erro ao adicionar cliente'
      console.log(err)
    } finally {
      loading.value = false
    }
  }

  async function updateClienteData(id: string, cliente: Omit<Cliente, 'id'>) {
    loading.value = true
    error.value = null
    try {
      const updatedCliente = await updateCliente(id, cliente)
      const index = clientes.value.findIndex((c) => c.id === id)
      if (index !== -1) {
        clientes.value[index] = updatedCliente
      }
    } catch (err: any) {
      error.value = 'Erro ao atualizar cliente'
      console.log(err)
    } finally {
      loading.value = false
    }
  }

  async function removeCliente(id: string) {
    loading.value = true
    error.value = null
    try {
      console.log(`Removing cliente with id: ${id}`)
      await deleteCliente(id)
      clientes.value = clientes.value.filter((c) => c.id !== id)
      if (clienteSelected.value?.id === id) {
        clienteSelected.value = null
      }
    } catch (err: any) {
      error.value = 'Erro ao remover cliente'
      console.log(err)
    } finally {
      loading.value = false
    }
  }

  return {
    clientes,
    clienteSelected,
    loading,
    error,
    fetchClientes,
    fetchCliente,
    addCliente,
    updateClienteData,
    removeCliente,
  }
}
