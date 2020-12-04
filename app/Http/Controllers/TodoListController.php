<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTodoListRequest;
use App\Http\Resources\TodoListResource;
use App\Models\TodoList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class TodoListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return TodoListResource::collection($request->user()->lists->all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTodoListRequest $request)
    {
        $formData = $request->validated();

        $request->user()->lists()->save(
            TodoList::make($formData)
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(TodoList $todoList)
    {
        Gate::authorize('own-todolist', $todoList);

        $todoList->load('tasks');

        return new TodoListResource($todoList);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(StoreTodoListRequest $request, TodoList $todoList)
    {
        Gate::authorize('own-todolist', $todoList);

        $formData = $request->validated();

        $todoList->update($formData);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(TodoList $todoList)
    {
        Gate::authorize('own-todolist', $todoList);

        $todoList->delete();
    }
}
