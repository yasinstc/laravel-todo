<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Todo;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('todo');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'item' => 'required|min:3',
        ]);

        if ($validator->fails()):
            return response()->json([
                'success' => false,
                'data' => [
                    'msg' => implode("\n", $validator->errors()->all('<p>:message</p>'))
                ]
            ]);
        endif;

        $new = new Todo();
        $new->name = $request->item;
        $new->save();

        return response()->json([
            'success' => true
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Todo $todo)
    {
        $todo = $todo->firstOrFail();

        $todo->delete();

        return response()->json([
            'success' => true
        ]);
    }

    public function getAll() {
        $todos = Todo::all();

        return response()->json($todos);
    }

    public function changeStatus(Todo $todo) {
        $todo = $todo->firstOrFail();

        if($todo->status == 'pending'):
            $todo->status = 'completed';
            $todo->completed_date = (new \DateTime())->format('Y-m-d H:i:s');
            $todo->update();
        else:
            $todo->status = 'pending';
            $todo->completed_date = null;
            $todo->update();
        endif;

        return response()->json([
            'success' => true
        ]);
    }
}