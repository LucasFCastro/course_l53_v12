<?php

/*
  |--------------------------------------------------------------------------
  | Web Routes
  |--------------------------------------------------------------------------
  |
  | This file is where you may define all of the routes that are handled
  | by your application. Just tell Laravel the URIs it should respond
  | to using a Closure or controller method. Build something great!
  |
 */

Route::get('/user2',function(){
    \Illuminate\Support\Facades\Auth::loginUsingId(2);
    return "Usuário CLIENT logado!";
});

Route::get('/user1',function(){
    \Illuminate\Support\Facades\Auth::loginUsingId(1);
    return "Usuário ADMIN logado!";
});

Route::get('/sair',function(){
    \Illuminate\Support\Facades\Auth::logout();
    return Redirect::route('admin.login');
});

Route::get('/', function () {
    return view('welcome');
});


Route::get('/home', function(){
    return redirect()->route('admin.home');
});

Route::group([
    'prefix' => 'admin',
    'as' => 'admin.'
    ], function() {

    Auth::routes();

    Route::group(['middleware' => 'can:access-admin'], function(){
        Route::get('/home', 'HomeController@index')->name('home');
    });

});
