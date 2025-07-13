import { ref, reactive } from 'vue'
import type { Cliente } from '@/types/Cliente'

export function useClienteUI() {
  const showModal = ref(false)
  const showModalDelete = ref(false)
  const clienteSelecionado = ref<Cliente | null>(null)

  const form = reactive({
    name: '',
    email: '',
  })

  function resetarFormulario() {
    form.name = ''
    form.email = ''
    clienteSelecionado.value = null
  }

  function abrirModalParaCriacao() {
    clienteSelecionado.value = null
    resetarFormulario()
    showModal.value = true
  }

  function abrirModalParaEdicao(cliente: Cliente) {
    clienteSelecionado.value = cliente
    form.name = cliente.name
    form.email = cliente.email
    showModal.value = true
  }

  function abrirModalParaExclusao(cliente: Cliente) {
    clienteSelecionado.value = cliente
    showModalDelete.value = true
  }

  return {
    showModal,
    showModalDelete,
    clienteSelecionado,
    form,
    abrirModalParaCriacao,
    abrirModalParaEdicao,
    abrirModalParaExclusao,
    resetarFormulario,
  }
}
