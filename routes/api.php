<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('api')->resource('/post', 'PostController');
Route::middleware('api')->resource('/user', 'UserController');
Route::middleware('api')->resource('/category', 'PostCategoryController');

//запросы для фильтра
Route::middleware('api')->get('/authorswithposts', 'UserController@authorsWithPosts');
Route::middleware('api')->get('/categorieswithposts', 'PostCategoryController@categoriesWithPosts');
Route::middleware('api')->get('/gettagswithposts', 'TagController@getTagsWithPosts');
