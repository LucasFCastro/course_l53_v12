@if ($errors->any())

	<ul class="collection">
		<li class="collection-item">
			<strong>Foram encontrados {{$errors->count()}} erros.</strong>
		</li>
		@foreach ($errors->all() as $error)
			<li class="collection-item red white-text">{{$error}}</li>
		@endforeach
	</ul>

@endif
