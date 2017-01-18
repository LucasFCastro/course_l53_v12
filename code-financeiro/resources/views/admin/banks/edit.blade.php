@extends('layouts.admin')
@section('content')
	<div class="container">
		<div class="row">
			<h4 class="center">Edição de Bancos</h4>
			{!! Form::model($bank, [
				'route' => ['admin.banks.update', 'bank' => $bank->id],
				'method' => 'PUT',
				'files' => true
				]) !!}
				@include('admin.banks._form')
				<div class="row">
					{!! Form::submit('Editar banco', ['class' => 'btn waves-effect']) !!}
				</div>
			{!! Form::close() !!}
		</div>
	</div>

@endsection
