<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MailInstruction extends Model
{
    protected $fillable = ['petition_type', 'instruction'];
}
