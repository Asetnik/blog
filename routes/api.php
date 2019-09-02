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

Route::middleware('api')->get('/numofcomments/{id}', 'PostCommentController@numOfComments');
Route::middleware('api')->get('/getpostcomments/{id}', 'PostCommentController@getPostComments');
Route::middleware('api')->resource('/post', 'PostController');
Route::middleware('api')->resource('/user', 'UserController');
Route::middleware('api')->resource('/category', 'PostCategoryController');
Route::middleware('api')->get('/categoryname/{id}', 'PostCategoryController@categoryName');
Route::middleware('api')->get('/getpostscategories', 'PostController@getPostsCategories');
Route::middleware('api')->get('/getpostsauthors', 'PostController@getPostsAuthors');
Route::middleware('api')->get('/getpoststags', 'PostController@getPostsTags');
Route::middleware('api')->get('/getuserposts/{id}', 'UserController@getUserPosts');
