<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

//Route::group([
//
//    'middleware' => 'api',
//    'prefix' => 'auth'
//
//], function ($router) {
//
//    Route::post('register', 'UserController@register');
//    Route::post('login', 'UserController@login');
//    Route::post('logout', 'UserController@logout');
//    Route::post('refresh', 'UserController@refresh');
//    Route::get('me', 'UserController@getAuthenticatedUser');
//
//});
//

//Route::post('login', 'UserController@login');

Route::post('login', 'UserController@authenticate');
Route::post('register', 'UserController@register'); // normal
Route::post('createUser', 'UserController@createUser');
Route::post('forgotPassword', 'PasswordForgotController@forgotPassword');

Route::group([
    'middleware' => 'api',
    'prefix' => 'password'
], function () {
    Route::post('create', 'PasswordResetController@create');
    Route::get('find/{token}', 'PasswordResetController@find');
});


Route::group(['middleware' => ['jwt.verify']], function() {

    Route::get('paginateData/{name}', 'DataController@prginateData');
    Route::post('activeUserResetPassword', 'PasswordResetController@activeUserResetPassword');


    Route::group(['prefix' => 'message'], function () {
        Route::get('','MessageController@index');
        Route::get('conversation','MessageController@conversation');
        Route::get('conversation/{id}','MessageController@getConversationByID');
        Route::post('create','MessageController@store');
        Route::get('/{id}','MessageController@edit');
        Route::get('user/{id}', 'MessageController@getUserById');
        Route::put('update/{id}','MessageController@update');
        Route::delete('delete/{id}','MessageController@destroy');
    });

    Route::group(['prefix' => 'file'], function () {
        Route::get('','FileController@index');
        Route::post('create','FileController@store');
        Route::get('/{id}','FileController@getByUserId');
        Route::get('user/{id}', 'FileController@getUserById');
        Route::put('update/{id}','FileController@update');
        Route::delete('delete/{id}','FileController@destroy');
        Route::delete('deleteSingleFile/{id}','FileController@deleteSingleFile');
        Route::get('sent-email/{id}','FileController@emailToAlien');
    });


    Route::group(['prefix' => 'auth'],function (){
        Route::get('closed', 'DataController@closed');
        Route::get('logout', 'UserController@logout');
        Route::get('user', 'UserController@getAuthenticatedUser');
        Route::get('user/{id}', 'UserController@getUserById');
        Route::delete('user/{id}', 'UserController@destroy');
    }); // auth end

    Route::group(['middleware' => ['role:admin'],'prefix' => 'admin'], function () {

        Route::group(['prefix' => 'email-setting'], function () {
            Route::get('','EmailSettingController@index');
            Route::post('create','EmailSettingController@store');
            Route::put('update/{id}','EmailSettingController@update');
        });

        Route::group(['prefix' => 'mailing-instruction'], function () {
            Route::get('','MailInstructionController@index');
            Route::post('create','MailInstructionController@store');
            Route::get('/{id}','MailInstructionController@edit');
            Route::put('update/{id}','MailInstructionController@update');
            Route::delete('delete/{id}','MailInstructionController@destroy');
        });

        Route::group(['prefix' => 'public-data'], function () {
            Route::get('','PublicDataController@index');
            Route::post('create','PublicDataController@store');
            Route::get('/{id}','PublicDataController@edit');
            Route::put('update/{id}','PublicDataController@update');
            Route::delete('delete/{id}','PublicDataController@destroy');
        });

        Route::group(['prefix' => 'announcement'], function () {
            Route::get('','AnnouncementContrller@index');
            Route::post('create','AnnouncementContrller@store');
            Route::get('/{id}','AnnouncementContrller@edit');
            Route::put('update/{id}','AnnouncementContrller@update');
            Route::delete('delete/{id}','AnnouncementContrller@destroy');
        });

        Route::group(['prefix' => 'user-profile'], function () {
            Route::get('','UserProfileController@index');
            Route::post('create','UserProfileController@store');
            Route::get('/{id}','UserProfileController@edit');
            Route::get('user/{id}', 'UserController@getUserById');
            Route::put('update/{id}','UserProfileController@update');
            Route::delete('delete/{id}','UserProfileController@destroy');
        });



    }); // role admin
}); // jwt end


Route::any('{path}', function() {
    return response()->json([
        'message' => 'The requested Route not found on server'
    ], 404);
})->where('path', '.*');