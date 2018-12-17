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
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Contracts\Providers\Auth;
//use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use JWTAuth;

class PasswordResetController extends Controller
{
    /**
     * Create token password reset
     *
     * @param  [string] email
     * @return [string] message
     */
    public function create(Request $request)
    {
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
    /**
     * Find token password reset
     *
     * @param  [string] $token
     * @return [string] message
     * @return [json] passwordReset object
     */
    public function find($token)
    {
        $passwordReset = PasswordReset::where('token', $token)
            ->first();
        if (!$passwordReset)
            return response()->json([
                'message' => 'This password reset token is invalid.'
            ], 404);
        if (Carbon::parse($passwordReset->updated_at)->addMinutes(720)->isPast()) {
            $passwordReset->delete();
            return response()->json([
                'message' => 'This password reset token is invalid.'
            ], 404);
        }
        return response()->json($passwordReset);
    }
     /**
     * Reset password
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @param  [string] token
     * @return [string] message
     * @return [json] user object
     */
    public function reset(Request $request)
    {

//        var_dump($request->all());

        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required',
            'c_password' => 'required|same:password',
            'token' => 'required|string'
        ]);
        $passwordReset = PasswordReset::where([
            ['token', $request->token],
            ['email', $request->email]
        ])->first();
        if (!$passwordReset){
//            return response()->json([
//                'message' => 'This password reset token is invalid.']);

            $userdetails=[
                "message"=>"This password reset token is invalid.reset"
            ];

            return view('customresetpassword')->with('userdetails',$userdetails);


        }


        $user = User::where('email', $passwordReset->email)->first();
        if (!$user){
//            return response()->json([
//                'message' => 'We cant find a user with that e-mail address.'
//            ], 404);


            $userdetails=[
                "message"=>"This password reset token is invalid.reset"
            ];
            return view('customresetpassword')->with('userdetails',$userdetails);

        }

        $user->password = bcrypt($request->password);
        $user->is_active = true;
        $user->save();
        $passwordReset->delete();
        $user->notify(new PasswordResetSuccess($passwordReset));


        $userdetails=[
            "message"=>"Password has been reset."
        ];
        return view('customresetpassword')->with('userdetails',$userdetails);

//        return response()->json(['Success'=>$user,'message'=>'Password has been reset']);
    }


    public function activeUserResetPassword(Request $request){
        $validator = Validator::make($request->all(), [
            'old_password' => 'required',
            'new_password' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        $input = $request->all();
//        $user = Auth::user();
        $user =  auth()->user();
        if (Hash::check($input['old_password'], $user->password)) {
            $user->password = bcrypt($input['new_password']);
            $user->save();
            return response()->json(['success' => 'password has been reset'], 202);
        }
        return response()->json(['message' => 'password mismatch'], 401);
    }
}
