<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function rules()
    {
        return [
            'username' => 'required|string|min:6|max:32|alpha_num|unique:users',
            'password' => 'required|string|min:8|max:64'
        ];
    }

    public function messages()
    {
        return [
            'username.required' => "Le nom d'utilisateur est obligatoire.",
            'username.string' => "Le nom d'utilisateur doit être une chaîne de caractères.",
            'username.min' => "Le nom d'utilisateur doit contenir 6 caractères minimum.",
            'username.max' => "Le nom d'utilisateur doit contenir 32 caractères maximum.",
            'username.alpha_num' => "Le nom d'utilisateur doit seulement être composé de caractères et de chiffres.",
            'username.unique' => "Le nom d'utilisateur est déjà en cours d'utilisation.",

            'password.required' => 'Le mot de passe est obligatoire.',
            'password.string' => "Le mot de passe doit être une chaîne de caractères.",
            'password.min' => 'Le mot de passe doit contenir 8 caractères minimum.',
            'password.max' => 'Le mot de passe doit contenir 32 caractères maximum.',
        ];
    }
}
