<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTodoTaskRequest;
use App\Models\TodoList;
use App\Models\TodoTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class TodoTaskController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTodoTaskRequest $request, TodoList $todoList)
    {
        Gate::authorize('own-todolist', $todoList);

        $formData = $request->validated();

        $todoList->tasks()->save(
            TodoTask::make($formData)
        );
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
