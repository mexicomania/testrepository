<?php

namespace App\Http\Controllers;

use App\Enums\PetitionType;
use App\MailInstruction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MailInstructionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $success = MailInstruction::all();
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
        $validator = Validator::make($request->all(), [
            'petition_type'  => 'required|enum_value:'.PetitionType::class,
            'instruction'      => 'required|string|max:255',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $data = $request->all();
        $data['petition_type'] =  PetitionType::getKey($data['petition_type']);
        $data = MailInstruction::create($data);
        $success['data'] = $data;
        return response()->json(['success'=>$success],200);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\MailInstruction  $mailInstruction
     * @return \Illuminate\Http\Response
     */
    public function show(MailInstruction $mailInstruction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\MailInstruction  $mailInstruction
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $id)
    {
        $entity = MailInstruction::findOrFail($id);
        $success['data'] = $entity;
        return response()->json(['success'=>$success],200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\MailInstruction  $mailInstruction
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'petition_type'  => 'sometimes|required|enum_value:'.PetitionType::class,
            'instruction'      => 'sometimes|required|string|max:255',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $entity = MailInstruction::findOrFail($id);



        $data = $request->all();
        $data['petition_type'] =  PetitionType::getKey($data['petition_type']);


        $entity->update($data);

        $success['data'] = $entity;
        return response()->json(['success'=>$success],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\MailInstruction  $mailInstruction
     * @return \Illuminate\Http\Response
     */
    public function destroy(MailInstruction $mailInstruction)
    {
        $mailInstruction->delete();
        return response()->json(['success'=>'successfully deleted'],200);
    }
}
