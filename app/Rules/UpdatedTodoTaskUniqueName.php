<?php

namespace App\Rules;

use App\Models\TodoTask;
use Illuminate\Contracts\Validation\Rule;

class UpdatedTodoTaskUniqueName implements Rule
{
    private $todoListId;

    public function __construct($todoListId)
    {
        $this->todoListId = $todoListId;
    }

    public function passes($attribute, $value)
    {
        return !$this->updatedNameExists($this->todoListId, $value);
    }

    public function message()
    {
        return "Ce nom est déjà en cours d'utilisation.";
    }

    private function updatedNameExists($todoListId, $updatedName)
    {
        return TodoTask::where([
            'todo_list_id' => $todoListId,
            'name' => $updatedName
        ])->exists();
    }
}
