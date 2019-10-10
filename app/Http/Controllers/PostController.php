<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Post;
use Illuminate\Support\Facades\Validator;


class PostController extends Controller
{
    private function filterPosts(Request $request, $postsQuery){
        if($authors = $request->get('author')){
            $authorsArray = explode(',', $authors);
            $postsQuery->whereIn('author_id', $authorsArray);
        }
        if($category = $request->get('category')){
            $categoriesArray = explode(',', $category);
            $postsQuery->whereIn('category_id', $categoriesArray);
        }
        if($tag = $request->get('tag')){
            $tagsArray = explode(',', $tag);
            $postsQuery->whereHas('tags', function ($query) use ($tagsArray) {
                $query->whereIn('tags.id', $tagsArray);
            });
        }
        if($dateSince = $request->get('dateSince')){
            $date = new Carbon($dateSince, 'Europe/Moscow');
            $postsQuery->where('created_at', '>=', $date);
        }
        if($dateUntil = $request->get('dateUntil')){
            $date = new Carbon($dateUntil, 'Europe/Moscow');
            $postsQuery->where('created_at', '<=', $date);
        }
        if($searchData = $request->get('search')){
            $postsQuery->where(function ($query) use ($searchData){
                $query->where('title', 'like', '%'.$searchData.'%')
                    ->orWhere('description', 'like', '%'.$searchData.'%');
            });
        }
        return $postsQuery;
    }

    public function getUserPosts(Request $request, $id = null){
        if($id){
            $posts = Post::latest()->with('author:id,name,surname,photo', 'tags:tag_id,tag', 'comments', 'category:id,category')->where('author_id', $id);
            $filteredPostsQuery = $this->filterPosts($request, $posts);
            $filteredPosts = $filteredPostsQuery->paginate(5);
            return response()->json($filteredPosts);
        }
        $posts = Post::latest()->with('author:id,name,surname,photo', 'tags:tag_id,tag', 'comments', 'category:id,category')->where('author_id', $request->user()->id);
        $filteredPostsQuery = $this->filterPosts($request, $posts);
        $filteredPosts = $filteredPostsQuery->paginate(5);
        return response()->json($filteredPosts);
    }

    public function adminIndex(Request $request)
    {
        $posts = Post::query()->latest()->with('status', 'author:id,name,surname,photo', 'tags:tag_id,tag', 'comments', 'category:id,category');
        $filteredPostsQuery = $this->filterPosts($request, $posts);
        $filteredPosts = $filteredPostsQuery->get();
        return response()->json($filteredPosts);
    }

    public function getSimilarPosts($id) {
        $post = Post::findOrFail($id);
        $posts = Post::where('category_id', $post->category_id)->whereNotIn('id', [$post->id])->limit(5)->get();
        return response()->json($posts);
    }

    public function getUserPopularPosts($id){
        $posts = Post::where('author_id', $id)->orderBy('views', 'desc')->limit(5)->get();
        return response()->json($posts);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $posts = Post::query()->latest()->with('author:id,name,surname,photo', 'tags:tag_id,tag', 'comments', 'category:id,category');
        $filteredPostsQuery = $this->filterPosts($request, $posts);
        $filteredPosts = $filteredPostsQuery->paginate(5);
        return response()->json($filteredPosts);
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
        $validator = Validator::make($request->all(), [
            'author_id' => 'required',
            'created_at' => 'required|date',
            'title' => 'required|max:255',
            'description' => 'required|max:255',
            'content' => 'required',
            'category_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(["errors" => $validator->errors()])->setStatusCode(422);
        }
        Post::add($request->all());
        return response('', 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = Post::with('author:id,name,surname,photo', 'tags', 'comments.author:id,name,surname,photo', 'category:id,category')
            ->findOrFail($id);
        $post->updateViews();
        return response()->json($post);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $post = Post::with('status', 'author:id,name,surname,photo', 'tags', 'comments.author:id,name,surname,photo', 'category:id,category')
            ->findOrFail($id);
        return response()->json($post);
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
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255',
            'description' => 'required|max:255',
            'content' => 'required',
            'category_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(["errors" => $validator->errors()])->setStatusCode(422);
        }
        $post = Post::findOrFail($id);
        $post->fill($request->all());
        if($status = $request->get('status_id')){
            $post->status = $status;
        }
        $tags = $request->get('tags_id');
        $post->tags()->sync($tags);
        $post->updated_at = Carbon::now();
        $post->save();
        return response('', 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();
    }
}
