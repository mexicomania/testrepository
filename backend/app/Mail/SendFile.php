<?php

namespace App\Mail;

use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Spatie\MediaLibrary\Models\Media;


class SendFile extends Mailable
{
    use Queueable, SerializesModels;

    public $file;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data=[])
    {

                $this->file = $data;


//        $mediaItems = $user->getMedia('cloud_files');
//        if($mediaItems ->isEmpty()){
//            return response()->json(['message'=> 'No data created yet'],200);
//        }
//
//        $success = $user;
//        foreach ($mediaItems as $key=>$image){
//            $success->media[$key]->url = $image->getUrl();
//            $success->media[$key]->path = $image->getPath();
//        }
//        $this->file = $user->media[0]->path;

//        var_dump($this->file['media']);

    }
//
//    public function init($file){
//        parent::__construct($file);
//        print_r($file);
//    }


    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {

        return $this->view('emails.sendEmail')
            ->subject('Document Upload')
            ->attach($this->file->url,
                [
                    'as' => $this->file->name,
                    'mime' => $this->file->mime_type,
                ]);





//        return $this->from('support@visaapp.com')
//            ->view('emails.sendEmail');

//        return response()->json(['message'=> $this->file],200);

//        return $this->view('emails.sendEmail')
//                    ->attachFromStorage($this->file->path, $this->file->name, [
//                        'mime' => 'application/pdf'
//                    ]);
    }
}
