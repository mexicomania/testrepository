<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EmailSetting extends Model
{
    protected $fillable = ['support_email', 'support_email_msg', 'support_email_res_mg', 'with_support_msg', 'with_review_request'];
}
