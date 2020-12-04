<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TodoListController;
use App\Http\Controllers\TodoTaskController;
use App\Models\TodoTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

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

Route::get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('guest')->group(function () {
    Route::post('/register', [AuthController::class, 'register'])
        ->name('register');
    Route::post('/login', [AuthController::class, 'login'])
        ->name('login');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])
        ->name('logout');

    Route::get('/lists', [TodoListController::class, 'index'])
        ->name('lists.index');
    Route::post('/lists', [TodoListController::class, 'store'])
        ->name('lists.store');
    Route::get('/lists/{todoList}', [TodoListController::class, 'show'])
        ->name('lists.show');
    Route::put('/lists/{todoList}', [TodoListController::class, 'update'])
        ->name('lists.update');
    Route::delete('/lists/{todoList}', [TodoListController::class, 'destroy'])
        ->name('lists.destroy');
    Route::post('/lists/{todoList}/clean', [TodoListController::class, 'clean'])
        ->name('lists.clean');

    Route::post('/lists/{todoList}/tasks', [TodoTaskController::class, 'store'])
        ->name('todos.store');
    Route::put('/tasks/{todoTask}', [TodoTaskController::class, 'update'])
        ->name('tasks.update');
    Route::delete('/tasks/{todoTask}', [TodoTaskController::class, 'destroy'])
        ->name('tasks.destroy');
    Route::post('/tasks/{todoTask}/complete', [TodoTaskController::class, 'complete'])
        ->name('tasks.complete');
    Route::post('/tasks/{todoTask}/restore', [TodoTaskController::class, 'restore'])
        ->name('tasks.restore');
});
