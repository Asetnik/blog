<?php

namespace App\Http\Controllers;

use App\PostComment;
use Illuminate\Http\Request;

class PostCommentController extends Controller
{

    public function numOfComments($id) {
        $numComments = PostComment::all('post_id')->where('post_id', '=', $id)->count();
        return response()->json($numComments);
    }

    public function getPostComments($postId) {
        $comments = PostComment::where('post_id', '=', $postId)
            ->join('users', 'post_comments.author_id', '=', 'users.id')
            ->select('users.name', 'users.surname', 'users.photo as avatar', 'post_comments.created_at', 'post_comments.content')
            ->get();
        return response()->json($comments);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}