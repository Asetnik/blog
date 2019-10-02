<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Http\Request;

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::middleware('auth')->resource('/api/posts', 'PostController');
Route::middleware('auth')->get('/api/admin/posts', 'PostController@adminIndex');
Route::middleware('auth')->get('/api/getuserposts/{id?}', 'PostController@getUserPosts');
Route::middleware('auth')->resource('/api/categories', 'PostCategoryController');
Route::middleware('auth')->resource('/api/roles', 'UserRoleController');
Route::middleware('auth')->resource('/api/statuses', 'UserStatusesController');

Route::middleware('auth')->get('/api/user', function (Request $request) {
    return response()->json($request->user());
});

Route::get('/api/isauth', 'UserController@isAuth');

Route::fallback(function () {
    return view('index');
});
