<?php

namespace App\Http\Controllers;

use App\EmailSetting;
use App\Mail\SupportResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class EmailSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $success = EmailSetting::all();
        return response()->json(['success'=>$success],200);
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
            'support_email'         => 'required|string|email|max:25',
            'support_email_msg'     => 'required|string|max:255',
            'support_email_res_mg'  => 'required|string|max:255',
            'with_support_msg'      => 'required|boolean',
            'with_review_request'   => 'required|boolean',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $data = $request->all();
        $data = EmailSetting::create($data);

        // for test
//        Mail::to($request->user())->send(new SupportResponse($data));


        $success['data'] = $data;
        return response()->json(['success'=>$success],200);


    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(), [
            'support_email'         => 'sometimes|required|string|email|max:25',
            'support_email_msg'     => 'sometimes|required|string|max:255',
            'support_email_res_mg'  => 'sometimes|required|string|max:255',
            'with_support_msg'      => 'sometimes|required|boolean',
            'with_review_request'   => 'sometimes|required|boolean',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $entity = EmailSetting::findOrFail($id);
        $entity->update($request->all());

        $success['data'] = $entity;
        return response()->json(['success'=>$success],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(EmailSetting $emailSetting)
    {
        $emailSetting->delete();
        return response()->json(['success'=>'successfully deleted'],200);
    }
}
