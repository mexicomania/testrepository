<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Exception $exception
     * @return \Illuminate\Http\Response
     */
//    public function render($request, Exception $exception)
//    {
//        return parent::render($request, $exception);
//    }

//    public function render($request, Exception $exception)
//    {
//        // This will replace our 404 response with
//        // a JSON response.
//        if ($exception instanceof ModelNotFoundException) {
//            return response()->json([
//                'error' => 'Resource not found'
//            ], 404);
//        }
//
//        return parent::render($request, $exception);
//    }
//

    public function render($request, Exception $exception)
    {
        $exception = $this->prepareException($exception);

        if ($exception instanceof \Illuminate\Http\Exceptions\HttpResponseException) {
            return $exception->getResponse();
        }
        if ($exception instanceof \Illuminate\Auth\AuthenticationException) {
            return $this->unauthenticated($request, $exception);
        }
        if ($exception instanceof \Illuminate\Validation\ValidationException) {
            return $this->convertValidationExceptionToResponse($exception, $request);
        }
        if ($exception instanceof ModelNotFoundException &&
            $request->wantsJson())
        {
            return response()->json([
                'data' => 'Resource not found'
            ], 404);
        }
        if ($exception instanceof \Spatie\Permission\Exceptions\UnauthorizedException) {
            return response()->json(['message'=>'You dont have permission'],403);
        }


        $response = [];

        $statusCode = 500;
        if (method_exists($exception, 'getStatusCode')) {
            $statusCode = $exception->getStatusCode();
        }

        switch ($statusCode) {
            case 404:
                $response['error'] = 'Resource Not Found';
                break;

            case 403:
                $response['error'] = 'Forbidden';
                break;

            default:
                $response['error'] = $exception->getMessage();
                break;
        }

        if (config('app.debug')) {
            $response['trace'] = $exception->getTrace();
            $response['code'] = $exception->getCode();
        }

        return response()->json($response, $statusCode);
    }


//    public function render($request, Exception $exception)
//    {
//        // This will replace our 404 response with
//        // a JSON response.
//        if ($exception instanceof ModelNotFoundException &&
//            $request->wantsJson())
//        {
//            return response()->json([
//                'data' => 'Resource not found'
//            ], 404);
//        }
//
//        return parent::render($request, $exception);
//    }

//    public function render($request, Exception $e)
//    {
//        if ($request->wantsJson() && !($e instanceof ValidationException)) {
//            $response = [
//                'message' => (string)$e->getMessage(),
//                'status_code' => 400,
//            ];
//
//            if ($e instanceof HttpException) {
//                $response['message'] = Response::$statusTexts[$e->getStatusCode()];
//                $response['status_code'] = $e->getStatusCode();
//            } else if ($e instanceof ModelNotFoundException) {
//                $response['message'] = Response::$statusTexts[Response::HTTP_NOT_FOUND];
//                $response['status_code'] = Response::HTTP_NOT_FOUND;
//            }
//
//            if ($this->isDebugMode()) {
//                $response['debug'] = [
//                    'exception' => get_class($e),
//                    'trace' => $e->getTrace()
//                ];
//            }
//
//            return response()->json([
//                'status' => 'failed',
//                'status_code' => $response['status_code'],
//                'massage' => $response['message'],
//            ], $response['status_code']);
//        }
//
//    }
}
