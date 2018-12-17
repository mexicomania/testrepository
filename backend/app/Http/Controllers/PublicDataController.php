<?php

namespace App\Http\Controllers;

use App\PublicData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PublicDataController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $success = PublicData::all();
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
    {}

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
//        var_dump($request->all());
        $validator = Validator::make($request->all(), [
            'company_name'         => 'required|string|max:40',
            'primary_domain_name'         => 'required|string|max:60',
            'support_phone'         => 'required|string|max:25',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $data = $request->all();
        $data = PublicData::create($data);
        $success['data'] = $data;
        return response()->json(['success'=>$success],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\PublicData  $publicData
     * @return \Illuminate\Http\Response
     */
    public function show(PublicData $publicData)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\PublicData  $publicData
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request,$id)
    {
        $entity = PublicData::findOrFail($id);
        $success['data'] = $entity;
        return response()->json(['success'=>$success],200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\PublicData  $publicData
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $entity = PublicData::findOrFail($id);
        $entity->update($request->all());

        $success['data'] = $entity;
        return response()->json(['success'=>$success],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\PublicData  $publicData
     * @return \Illuminate\Http\Response
     */
    public function destroy(PublicData $publicData)
    {
        $publicData->delete();
        return response()->json(['success'=>'successfully deleted'],200);
    }
}
