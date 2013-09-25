<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/
Event::listen('illuminate.query', function() {
    Log::info('SQL', func_get_args());
});

Route::controller('users', 'UserController');
Route::controller('roles', 'RoleController');
Route::controller('permissions', 'PermissionController');
Route::controller('account', 'AccountController');
Route::get('/', function()
{
    return View::make('template');
});