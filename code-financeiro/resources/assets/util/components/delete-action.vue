<template lang="html">

	<a href="" @click.prevent="showModal()">
		<i class="material-icons">delete</i>
	</a>

	<form method="POST" :action="action" :id="id">
       <input type="hidden" name="_method" value="DELETE"/>
       <input type="hidden" name="_token" :value="csrfToken"/>
   	</form>

	<modal :modal="modal">
	  <div slot="content">
		  <h4 class="header-dialog">Mensagem de Confirmmação</h4>
		  <div class="divider"></div>
		  <p><strong>Você tem certeza que deseja excluir este item?</strong></p>
		  <p>nome: <strong>{{ textName }}</strong></p>
		  <div class="divider"></div>
	  </div>
	  <div slot="footer">
		  <button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action" @click="deleteItem()">Confirmar</button>
	  </div>
	  <div slot="footer">
		  <button class="btn btn-flat waves-effect grey lighten-2 waves-red modal-close modal-action">Cancelar</button>
	  </div>
  </modal>

</template>

<script>
import modalComponent from './modal.vue';
export default {
	props:['text-name', 'action', 'csrf-token','id'],
	components: {
        'modal':  modalComponent
    },
	ready(){
		this.modal.id = `modal-${this.id}`
	},
	data() {
		return {
			modal: {
	            id: ''
	        }
		}
	},
	methods: {
		showModal(){
			$(`#${this.modal.id}`).modal();
			$(`#${this.modal.id}`).modal('open');
		},
		deleteItem(){
			$(`#${this.id}`).submit();
			swal("Excluído!", `O registro foi excluído com sucesso.`, "success");
		}
	}
}
</script>

<style lang="css">
</style>
