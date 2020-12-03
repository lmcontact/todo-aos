<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTodoListRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'required|string|min:2|max:64'
        ];
    }

    public function messages() {
        return [
            'name.required' => 'Le nom est obligatoire.',
            'name.string' => 'Le nom doit être une chaîne de caractères.',
            'name.min' => 'Le nom doit contenir 2 caractères minimum.',
            'name.max' => 'Le nom doit contenir 64 caractères maximum.',
        ];
    }
}
