<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
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
}
