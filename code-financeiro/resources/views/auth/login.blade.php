@extends('layouts.admin')

@section('content')
<div class="container">
    <div class="row">
        <div class="col s8 offset-s2 z-depth-4">
            <h5 class="center">Login Code Financeiro Admin</h5>
            <form method="POST" action="{{ env('URL_ADMIN_LOGIN') }}">
                {{ csrf_field() }}

                <div class="row">
                    <div class="input-field col s12">
                        <?php $messagError = $errors->has('email') ? "data-error='{$errors->first('email')}'" : null ?>
                        <input id="email" type="email" name="email" value="{{ old('email')}}" class="validate {{ $messagError ? 'Invalid' : $messagError}}">
                        <label for="email" {!! $messagError !!} class="active">E-Mail</label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12">
                        <?php $messagError = $errors->has('password') ? "data-error='{$errors->first('password')}'" : null ?>
                        <input id="password" type="password" name="password" value="{{ old('password')}}" class="validate {{ $messagError ? 'Invalid' : $messagError}}">
                        <label for="password" {!! $messagError !!} class="active">Senha</label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s6 center">
                        <div class="checkbox">
                            <input type="checkbox" id="remember">
                            <label for="remember"> Lembrar-me</label>
                        </div>
                    </div>
                    <div class="input-field col s6 center" style="top: 0.8rem">
                        <a href="{{ url('/password/reset') }}">
                            Esqueceu sua senha?
                        </a>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12 center">
                        <button type="submit" class="btn waves-effect waves-light">
                            Login
                        </button>

                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

@endsection
