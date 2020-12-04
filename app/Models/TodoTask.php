<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class TodoTask extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'completed'];

    public function list()
    {
        return $this->belongsTo(TodoList::class, 'todo_list_id');
    }
}
