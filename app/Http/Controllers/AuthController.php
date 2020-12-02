<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $formData = $request->validated();

        User::create([
            'username' => $formData['username'],
            'password' => Hash::make($formData['password'])
        ]);
    }

    public function login(LoginRequest $request)
    {
        $formData = $request->validated();

        $credentials = Arr::except($formData, 'remember');

        if (!Auth::attempt($credentials, $formData['remember'])) {
            abort(401, 'Les identifiants sont invalides.');
        }
    }
}
