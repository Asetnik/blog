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

/*Route::resource('/post', 'PostController');*/
Route::resource('/users', 'UserController');
Route::resource('/categories', 'PostCategoryController');
Route::resource('/tags', 'TagController');

//запросы для фильтра
Route::get('/authorswithposts', 'UserController@authorsWithPosts');
Route::get('/categorieswithposts', 'PostCategoryController@categoriesWithPosts');
Route::get('/gettagswithposts', 'TagController@getTagsWithPosts');
