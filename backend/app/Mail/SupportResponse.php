<?php

namespace App\Mail;

use App\EmailSetting;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class SupportResponse extends Mailable
{
    use Queueable, SerializesModels;

    public $emailSetting;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(EmailSetting $emailSetting)
    {
        $this->emailSetting = $emailSetting;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from($this->emailSetting->support_email)
                    ->view('emails.response');
    }
}
