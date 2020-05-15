<?php

namespace App\Http\Controllers;

use App\Game;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class GamesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
//        return Game::getBestGames();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        $game = $request->all();
        //dodac walidacje zdjecia
        if ($image = $request->file('image')) {
            $imagePath = Storage::disk('public_uploads')->put('photos', $image);
            $game['image_path'] = $imagePath;
        }

        if ($game['player_name'] == null || trim($game['player_name']) == '') {
            $game['player_name'] = 'Gość' . (1 + Game::getLastId());
        }
        Game::create($game);
    }

    /**
     * Display the specified resource.
     *
     * @param $level
     * @return Response
     */
    public function show($level)
    {
        return Game::getBestGames($level);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
