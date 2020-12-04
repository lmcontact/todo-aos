<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTodoTaskRequest;
use App\Http\Requests\UpdateTodoTaskRequest;
use App\Models\TodoList;
use App\Models\TodoTask;
use App\Rules\UpdatedTodoTaskUniqueName;
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
            TodoTask::make(array_merge($formData, ['completed' => false]))
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTodoTaskRequest $request, TodoTask $todoTask)
    {
        Gate::authorize('own-task', $todoTask);

        $formData = $request->validated();

        if ($todoTask->name !== $formData['name']) {
            $request->validate(['name' => [
                new UpdatedTodoTaskUniqueName($todoTask->todo_list_id)
            ]]);
        }

        $todoTask->update($formData);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(TodoTask $todoTask)
    {
        Gate::authorize('own-task', $todoTask);

        $todoTask->delete();
    }

    public function complete(TodoTask $todoTask)
    {
        Gate::authorize('own-task', $todoTask);

        $todoTask->complete();
    }

    public function restore(TodoTask $todoTask)
    {
        Gate::authorize('own-task', $todoTask);

        $todoTask->restore();
    }
}
