<?php

namespace App\Http\Controllers;

use App\Mail\SendFile;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use JWTAuth;
use Spatie\MediaLibrary\Models\Media;
use stdClass;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = auth()->user();
        $mediaItems = $user->getMedia('cloud_files');
        if($mediaItems ->isEmpty()){
            return response()->json(['message'=> 'No data created yet'],200);
        }
        $success = $user;
        $obj = new stdClass();
//        foreach ($mediaItems as $key=>$image){
//            $obj->{$key} = $image->getUrl();
//            $success->media[$key]->url = $obj->$key;
//        }
        foreach ($mediaItems as $key=>$image){
            $success->media[$key]->url = $image->getUrl();
            $success->media[$key]->path = $image->getPath();
        }
        return response()->json(['success'=>$mediaItems],200);
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
        $userId  = auth()->user();
        $userId
            ->addMultipleMediaFromRequest(["files"])
            ->each(function ($fileAdder) {
                $fileAdder->toMediaCollection('cloud_files');
            });
        return response()->json(['success' =>$userId ],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\File  $file
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\File  $file
     * @return \Illuminate\Http\Response
     */
    public function getByUserId($id)
    {
        $u = new UserController();
        $user = $u->getUserById($id)->original['success'];
        $mediaItems = $user->getMedia('cloud_files');
        if($mediaItems ->isEmpty()){
            return response()->json(['message'=> 'No data created yet'],200);
        }
        $success = $user;
        $obj = new stdClass();
        foreach ($mediaItems as $key=>$image){
            $obj->{$key} = $image->getUrl();
            $success->media[$key]->url = $obj->$key;
        }
        return response()->json(['success'=>$user],200);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\File  $file
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\File  $file
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
//        $entity= File::findOrFail($id);
//        $entity->delete();
//        return response()->json(['success'=>'successfully deleted']);
    }


    public function deleteSingleFile($id)
    {
        $media = Media::find($id);
        $model = User::find($media->model_id);
        $model->deleteMedia($media->id);

        return response()->json(['success'=>'successfully deleted file']);

    }

    public function emailToAlien($id)
    {
//        $media = Media::find($id);
//        Mail::to($request->user())->send(new SupportResponse($data));

        $u = new UserController();
        $user = $u->getUserById($id)->original['success'];
        $mediaItems = $user->getMedia('cloud_files');
        if($mediaItems ->isEmpty()){
            return response()->json(['message'=> 'No data created yet'],200);
        }

        $success = $user;
        foreach ($mediaItems as $key=>$image){
            $success->media[$key]->url = $image->getUrl();
            $success->media[$key]->path = $image->getPath();
        }

        Mail::to($user->email)->send(new SendFile($user->media[0]));
//        Mail::to($user->email)->send(new SendFile($user));

        return response()->json(['success'=>$user->media[0]],200);


    }
}
