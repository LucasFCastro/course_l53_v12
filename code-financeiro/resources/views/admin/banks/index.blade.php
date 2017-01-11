@extends('layouts.admin')
@section('content')
	<div class="container">
		<div class="row">
			<h4 class="center">Listagem de Bancos</h4>
			<div class="col s12">
				 <a class="
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
		  				  <td>{{ $bank->name }}</td>
		  				  <td class="center">
		  					<a href="">
		  						<i class="material-icons">edit</i>
		  					</a> |
		  					<a href="">
		  						<i class="material-icons">delete</i>
		  					</a>
		  				  </td>
		  				</tr>
					@endforeach
			  </tbody>
			</table>
			{!! $banks->links() !!}
		</div>
	</div>

@endsection
