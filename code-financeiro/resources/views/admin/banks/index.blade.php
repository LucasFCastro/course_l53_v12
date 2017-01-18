@extends('layouts.admin')
@section('content')
	<div class="container">
		<div class="row">
			<h4 class="center">Listagem de Bancos</h4>
			<div class="col s12">
				 <a href="{{route('admin.banks.create')}}" class="
					 btn-floating btn-large waves-effect waves-light
					 z-depth-3
					 right"
					 ><i class="material-icons">add</i></a>
			 </div>
		 </div>

		 <div class="row">
			<table class="bordered responsive-table highlight z-depth-3">
			  <thead>
				<tr>
				  <th class="center">Id</th>
				  <th>Nome do Banco</th>
				  <th class="center">Ações</th>
				</tr>
			  </thead>
			  <tbody>
				  	@foreach ($banks as $bank)
					  	<tr>
		  				  <td class="center">{{ $bank->id }}</td>
		  				  <td>
							  <div class="row valign-wrapper">
							  	<div class="col s4">
							  		<img src="{{asset("storage/banks/images/{$bank->logo}")}}" alt="{{ $bank->name }}"
									class="logo-bank">
							  	</div>
							  	<div class="col s8">
									{{ $bank->name }}
							  	</div>
							  </div>
						  </td>
		  				  <td class="center">
		  					<a href="{{route('admin.banks.edit', ['bank' => $bank->id])}}">
		  						<i class="material-icons">edit</i>
		  					</a> |
							 	<delete-action
									text-name="{{$bank->name}}"
									action="{{route('admin.banks.destroy', ['bank' => $bank->id])}}"
									id="form-delete-{{$bank->id}}"
									csrf-token="{{csrf_token()}}"
									>

							 	</delete-action>
		  				  </td>
		  				</tr>
					@endforeach
			  </tbody>
			</table>
			{!! $banks->links() !!}
		</div>
	</div>

@endsection
