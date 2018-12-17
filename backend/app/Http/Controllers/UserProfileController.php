<?php

namespace App\Http\Controllers;

use App\Enums\PetitionType;
use App\Enums\LoginStatus;
use App\User;
use App\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use JWTAuth;

class UserProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $success = UserProfile::all();
        if($success->isEmpty()){
            return response()->json(['message'=> 'No data created yet'],200);
        }
        return response()->json(['success'=>$success],200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), array(
            'petition_type'  => 'required|enum_value:'.PetitionType::class,
        ));

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $data = $request->all();
        $user_id = auth()->user();
        $data['user_id'] = $user_id->id;
        $data['petition_type'] =  PetitionType::getKey($data['petition_type']);
        $data['login_status'] = LoginStatus::getKey(1);
        $data = UserProfile::create($data);
        $success['data'] = $data;
        return response()->json(['success'=>$success],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\UserProfile  $userProfile
     * @return \Illuminate\Http\Response
     */
    public function show(UserProfile $userProfile)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\UserProfile  $userProfile
     * @return \Illuminate\Http\Response
     */
    public function edit(UserProfile $userProfile, $id)
    {
       $user = UserProfile::findOrFail($id);
        return response()->json(['success'=>$user]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\UserProfile  $userProfile
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), array(
            'petition_type'  => 'required|enum_value:'.PetitionType::class,
        ));

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $data = $request->all();
        $user_id = auth()->user();
        $data['user_id'] = $user_id->id;
        $data['petition_type'] =  PetitionType::getKey($data['petition_type']);
        $data['login_status'] = LoginStatus::getKey(2);

        $profile = UserProfile::findOrFail($id);
        $profile->fill($data)->save();

        return response()->json(['success'=>$profile],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\UserProfile  $userProfile
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $userProfile= UserProfile::findOrFail($id);
        $userProfile->delete();
        return response()->json(['success'=>'successfully deleted']);

    }

// This function already define in user

//    public function getUserById($id)
//    {
//        $user = User::findOrFail($id);
//        $user->userProfile;
//        return response()->json(['success'=>$user]);
//
//    }
}
