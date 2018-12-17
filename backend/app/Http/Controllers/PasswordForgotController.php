<?php

namespace App\Http\Controllers;

//namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Notifications\PasswordResetRequest;
use App\Notifications\PasswordResetSuccess;
use App\User;
use App\PasswordReset;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class PasswordForgotController extends Controller
{
   public function forgotPassword(Request $request){
       $request->validate([
           'email' => 'required|string|email',
       ]);
       $user = User::where('email', $request->email)->first();
       if (!$user)
           return response()->json([
               'message' => 'We cant find a user with that e-mail address.'
           ], 404);
       $passwordReset = PasswordReset::updateOrCreate(
           ['email' => $user->email],
           [
               'email' => $user->email,
               'token' => str_random(60)
           ]
       );
       if ($user && $passwordReset)
           $user->notify(
               new PasswordResetRequest($passwordReset->token)
           );
       return response()->json([
           'message' => 'We have e-mailed your password reset link!'
       ]);
   }
}
