<?php

namespace App\Http\Requests;

use App\Rules\TodoTaskUniqueName;
use Illuminate\Foundation\Http\FormRequest;

class StoreTodoTaskRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => ['required', 'string', 'min:4', 'max:64', new TodoTaskUniqueName($this)],
            'description' => 'nullable|string|max:500'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Le nom est obligatoire.',
            'name.string' => 'Le nom doit être une chaîne de caractères.',
            'name.min' => 'Le nom doit contenir 4 caractères minimum.',
            'name.max' => 'Le nom doit contenir 64 caractères maximum.',

            'description.string' => 'La description doit être une chaîne de caractères.',
            'description.max' => 'La description doit contenir 500 caractères maximum.'
        ];
    }
}
