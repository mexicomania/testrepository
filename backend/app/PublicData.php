<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PublicData extends Model
{

    protected $fillable = ['company_name','primary_domain_name','sub_domain_name','support_phone','street','city','state','postal_code','country'];
//
//"company_name": "Visa App",
//"primary_domain_name": "visapp.com",
//"sub_domain_name": "subvisapp.com",
//"support_phone": "12345678",
//"street": "abc street",
//"city": "abc city",
//"state": "abc state",
//"postal_code": "727272",
//"country": "Pakistan"

}
