<?php

namespace App\Http\Controllers;

use App\Message;
use App\User;
use Illuminate\Support\Facades\DB;
use JWTAuth;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $messages = Message::all();
        $myMessages = [];
        $receiver_id =   auth()->user()->id;

        foreach ($messages as $message){
            if($message->receiver_id == $receiver_id){
                array_push($myMessages, $message);
            }
        }
        if(count($myMessages) === 0 ){
            return response()->json(['message'=> 'No message'],200);
        }


        return response()->json(['success'=>$myMessages]);
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function conversation()
    {
         $myId =   auth()->user()->id;

        $users = DB::table('messages')
                ->where('receiver_id','=',$myId)
                ->orWhere('sender_id','=',$myId)
                ->orderBy('id')
                ->get();

        return response()->json(['success'=>$users]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getConversationByID($id)
    {
        $myId =   auth()->user()->id;

        $users = DB::table('messages')
            ->where('receiver_id','=',$id)
            ->orWhere('sender_id','=',$id)
            ->orderBy('id')
            ->get();

        return response()->json(['success'=>$users]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $sender_id =   auth()->user()->id;
        $message = $request->all();
        $message['sender_id'] = $sender_id;
        $success = Message::create($message);

        return response()->json(['success'=> $success]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function show(Message $message)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $entity = Message::findOrFail($id);
        $entity->update($request->all());

        $success['data'] = $entity;
        return response()->json(['success'=>$success],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function destroy(Message $message)
    {
        //
    }
}
