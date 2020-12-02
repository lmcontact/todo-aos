<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function rules()
    {
        return [
            'username' => 'required|exists:users',
            'password' => 'required',
            'remember' => 'required|boolean'
        ];
    }

    public function messages()
    {
        return [
            'username.required' => "Le nom d'utilisateur est obligatoire.",
            'username.exists' => "Cet utilisateur n'existe pas.",

            'password.required' => 'Le mot de passe est obligatoire.',
        ];
    }
}
