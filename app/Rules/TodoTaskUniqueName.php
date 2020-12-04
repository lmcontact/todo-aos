<?php

namespace App\Rules;

use App\Models\TodoTask;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Http\Request;

class TodoTaskUniqueName implements Rule
{
    private $request;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return !TodoTask::where([
            'name' => $value,
            'todo_list_id' => $this->request->segment(3)
        ])->exists();
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return "Ce nom est déjà en cours d'utilisation.";
    }
}
