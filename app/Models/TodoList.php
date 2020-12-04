<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class TodoList extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tasks()
    {
        return $this->hasMany(TodoTask::class);
    }

    public function delete()
    {
        TodoTask::where('todo_list_id', $this->id)->delete();
        return parent::delete();
    }

    public function clean()
    {
        TodoTask::where([
            'todo_list_id' => $this->id,
            'completed' => true
        ])->delete();
    }
}
