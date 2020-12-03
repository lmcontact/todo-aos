<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class TodoTask extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description'];

    public function list()
    {
        $this->belongsTo(TodoList::class);
    }
}
