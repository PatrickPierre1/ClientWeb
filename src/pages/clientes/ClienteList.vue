<script lang="ts" setup>
import { onMounted } from 'vue'
import { useClientes } from '@/composables/useClientes'
import { useClienteUI } from '@/composables/useClienteUI'
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import { ref } from 'vue'
import type { Cliente } from '@/types/Cliente'

const toast = useToast()
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UButton = resolveComponent('UButton')
const UModal = resolveComponent('UModal')
const globalFilter = ref('')

const {
  showModal,
  showModalDelete,
  clienteSelecionado,
  form,
  abrirModalParaCriacao,
  abrirModalParaEdicao,
  abrirModalParaExclusao,
  resetarFormulario,
} = useClienteUI()

const {
  clientes,
  loading,
  error,
  fetchClientes,
  fetchCliente,
  addCliente,
  updateClienteData,
  removeCliente,
} = useClientes()

onMounted(() => {
  fetchClientes()
})

function excluirCliente(id: string) {
  try {
    removeCliente(id)
    toast.add({
      title: 'Cliente excluído!',
      description: 'O cliente foi removido com sucesso.',
      color: 'error',
    })
    fetchClientes()
  } catch (error) {
    toast.add({
      title: 'Erro ao excluir',
      description: 'Não foi possível excluir o cliente.',
      color: 'error',
    })
  }
}

const columns: TableColumn<Cliente>[] = [
  { accessorKey: 'id', header: '#' },
  { accessorKey: 'name', header: 'Nome' },
  { accessorKey: 'email', header: 'E-mail' },
  {
    id: 'actions',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            content: {
              align: 'end',
            },
            items: [
              {
                label: 'Editar',
                icon: 'i-lucide-edit',
                onClick: () => abrirModalParaEdicao(row.original),
              },
              {
                label: 'Excluir',
                icon: 'i-lucide-trash-2',
                color: 'error',
                onClick: () => abrirModalParaExclusao(row.original),
              },
            ],
            'aria-label': 'Actions dropdown',
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis-vertical',
              color: 'dark',
              variant: 'ghost',
              class: 'ml-auto',
              'aria-label': 'Actions dropdown',
            }),
        ),
      )
    },
  },
]

async function handleSubmit() {
  try {
    if (clienteSelecionado.value) {
      const idSelecionado = clienteSelecionado?.value.id
      if (typeof idSelecionado === 'string') {
        await updateClienteData(idSelecionado, {
          name: form.name,
          email: form.email,
        })
        toast.add({
          title: 'Cliente atualizado com sucesso!',
          description: `Dados de ${form.name} foram atualizados.`,
          color: 'secondary',
        })
      } else {
        throw new Error('ID do cliente não está definido.')
      }
    } else {
      await addCliente({
        name: form.name,
        email: form.email,
      })
      toast.add({
        title: 'Cliente criado com sucesso!',
        description: `${form.name} foi adicionado.`,
        color: 'success',
      })
    }

    await fetchClientes()
    showModal.value = false
    resetarFormulario()
    clienteSelecionado.value = null
  } catch (error) {
    toast.add({
      title: 'Erro',
      description: 'Algo deu errado ao salvar o cliente.',
      color: 'error',
    })
    console.error('Erro ao salvar cliente:', error)
  }
}
</script>

<template lang="">
  <div class="space-y-6">
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      "
    >
      <h1 class="text-2xl font-bold">📋 Lista de Clientes</h1>
    </div>
    <div class="flex justify-between py-3">
      <UInput
        v-model="globalFilter"
        variant="outlined"
        class="w-lg border border-gray-300 rounded-lg"
        icon="i-lucide-search"
        placeholder="Digite o nome ou email do cliente"
      />
      <UButton
        icon="i-lucide-circle-plus"
        size="lg"
        color="primary"
        class="text-white cursor-pointer"
        variant="solid"
        @click="abrirModalParaCriacao()"
        >Adicionar</UButton
      >
    </div>
    <UTable
      ref="table"
      v-model:global-filter="globalFilter"
      :loading="loading"
      :columns="columns"
      :data="clientes"
      variant="striped"
      class="border border-gray-200 rounded-xl shadow-md overflow-hidden"
      style="background-color: white"
    />
  </div>

  <UModal
    v-model:open="showModal"
    :title="clienteSelecionado ? 'Editar Cliente' : 'Adicionar Cliente'"
    description="Preencha os dados do cliente"
  >
    <template #body>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <UFormField label="Nome">
          <UInput size="lg" class="w-full pb-4" v-model="form.name" placeholder="Digite seu nome" />
        </UFormField>
        <UFormField label="Email">
          <UInput
            size="lg"
            class="w-full pb-4"
            v-model="form.email"
            placeholder="Digite seu email"
          />
        </UFormField>
        <div class="flex justify-end gap-2 mt-6">
          <UButton class="cursor-pointer" variant="outline" @click="showModal = false"
            >Cancelar</UButton
          >
          <UButton class="cursor-pointer" type="submit" color="primary">Salvar</UButton>
        </div>
      </form>
    </template>
  </UModal>

  <UModal
    v-model:open="showModalDelete"
    title="Tem certeza que deseja excluir este cliente?"
    description="Esta ação não pode ser desfeita."
  >
    <template #body>
      <div class="flex justify-end gap-2 mt-6">
        <UButton class="cursor-pointer" variant="outline" @click="showModalDelete = false"
          >Cancelar</UButton
        >
        <UButton
          class="cursor-pointer"
          @click="excluirCliente(clienteSelecionado?.id || '') && (showModalDelete = false)"
          color="primary"
          >Salvar</UButton
        >
      </div>
    </template>
  </UModal>
</template>

<style></style>
