<?php
/**
 * Created by PhpStorm.
 * User: 0sama
 * Date: 10/28/2018
 * Time: 6:14 PM
 */


abstract class UserType extends  Enum {
    const User = "User";
    const Admin= "Admin";
}




abstract  class  Enum {
    static function getKeys(){
        $class = new Reflection(get_called_class());
        return array_keys($class->getConstants());
    }
}