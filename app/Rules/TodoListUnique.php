<?php

namespace App\Rules;

use App\Models\TodoList;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class TodoListUnique implements Rule
{
    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return !TodoList::where([
            'user_id' => Auth::user()->id,
            'name' => $value
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
