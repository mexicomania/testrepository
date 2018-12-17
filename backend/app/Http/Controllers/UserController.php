<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Notifications\PasswordResetRequest;
use App\Notifications\PasswordResetSuccess;
use App\PasswordReset;


class UserController extends Controller
{
    public $successStatus = 200;

    //normal login without verification email
    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }



        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        $user =  auth()->user();

        if($user->is_active == false){
            return response()->json(['message'=>'Please verify email'], 401);
        }
//        $user->hasAnyRole(Role::all());

        $user->hasAnyRole(Role::all());
        $success['user'] = $user;
        $success['token'] = $token;

        return response()->json(['success'=>$success]);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'role' => 'required_without:user,admin',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        $user = User::create([
            'first_name' => $request->get('first_name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
            'is_active'=> true
        ]);

        $role = $request->get('role');
        $user->assignRole($role);
        $token = JWTAuth::fromUser($user);

        $success['user'] = $user;
        $success['token'] = $token;

        return response()->json(['success'=>$success],201);
    }

    public function getAuthenticatedUser()
    {
        try {

            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['message'=>'user not found'], 404);
            }

        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

            return response()->json(['token_expired'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

            return response()->json(['token_invalid'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

            return response()->json(['token_absent'], $e->getStatusCode());

        }

        $user->hasAnyRole(Role::all());
        $success['user'] = $user;

        return response()->json(['success'=>$success]);
//        return response()->json(compact('user'));
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }


    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function createUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
            'last_name'=>'required',
            'email' => 'required|email',
            'password' => 'sometimes|required',
            'c_password' => 'same:password',
            'role' => 'required_without:user,admin',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        $input = $request->all();
        $passwordReset = PasswordReset::updateOrCreate(
            ['email' => $input['email']],
            [
                'email' => $input['email'],
                'token' => str_random(60)
            ]
        );

        $input['password'] = bcrypt('123123');
        $input['is_active'] = false;
        $user = User::create($input);
        if ($passwordReset)
            $user->notify(
                new PasswordResetRequest($passwordReset->token)
            );
        $role = $request->get('role');
        return response()->json([
            'message' => 'We have e-mailed your password reset link!'
        ]);
        $user->assignRole($role);
        $success['user'] = $user;
        return response()->json(['success'=>$success], $this-> successStatus);
    }

    /**
     * login api
     *
     * @return \Illuminate\Http\Response
     */
//    public function login(Request $request){
//
//        $validator = Validator::make($request->all(), [
//            'email' => 'required|email',
//            'password' => 'required',
//        ]);
//        if($validator->fails()){
//            return response()->json($validator->errors(), 400);
//        }
//
//        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){
//            $user = Auth::user();
//            if($user->is_active == false){
//                return response()->json(['message'=>'Please verify email'], 401);
//            }
//            $user->hasAnyRole(Role::all());
//            $success['token'] =  $user->createToken('MyApp')-> accessToken;
//            $success['user'] = $user;
//            return response()->json(['success' => $success], $this-> successStatus);
//        }
//        else{
//            return response()->json(['error'=>'Unauthorised'], 401);
//        }
//    }


    public function getUserById($id)
        {
            $user = User::findOrFail($id);
            $user->userProfile;
            return response()->json(['success'=>$user]);

        }

    public function destroy($id)
    {
        $user= User::findOrFail($id);
        if($user->userProfile){
            $user->userProfile->delete();
        }
        $user->delete();
        return response()->json(['success'=>'successfully deleted']);
    }



}