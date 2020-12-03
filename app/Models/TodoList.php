<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class TodoList extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
