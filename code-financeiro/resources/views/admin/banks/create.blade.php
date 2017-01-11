@extends('layouts.admin')
@section('content')
	<div class="container">
		<div class="row">
			<h4 class="center">Cadastro de Bancos</h4>
			{!! Form::open(['route' => 'admin.banks.store']) !!}
				<div class="row">
					<div class="input-field col s6">
						{!! Form::label('name', 'Name') !!}
						{!! Form::text('name', null) !!}
					</div>
				</div>
				<div class="row">
					{!! Form::submit('Criar banco', ['class' => 'btn waves-effect']) !!}
				</div>
			{!! Form::close() !!}
		</div>
	</div>

@endsection
