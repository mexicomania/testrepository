<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Request;

class DataController extends Controller
{
    public function prginateData($name)
    {
        $sort = Input::get('sort')  ? Input::get('sort') : 'id'; // if user type in the url a column that doesnt exist app will default to id
        $order = Input::get('order') ? Input::get('order') : 'desc'; // default desc
        $perPage = Input::get('perPage') ? Input::get('perPage') : 10;
        $search = Input::get('search');
        $searchBy = Input::get('searchBy');


        if($name == 'user')
        {
            $user = User::role('user')->orderBy($sort,$order);
            if($searchBy && $search){
                $user = $user->where($searchBy,'like','%'.$search.'%');
            }
            $success = $user->paginate($perPage);
           return response()->json(['success'=>$success]);

//            $users = User::paginate();
//            $userWithRole = [];
//            foreach ($users as  $key=>$value){
//                if($value->hasRole('user')){
//                    array_push($userWithRole, $value);
//                }
//            }
//            return response()->json(['success'=>$userWithRole]);


        }

        return response()->json(['message'=>$name.' not found'],404);

    }

}