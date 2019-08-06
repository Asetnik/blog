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
Route::middleware('api')->get('/getposttags/{id}', 'TagController@getPostTags');
Route::middleware('api')->get('/getpostcomments/{id}', 'PostCommentController@getPostComments');
