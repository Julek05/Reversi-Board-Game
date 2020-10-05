<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Database\Eloquent\Collection;
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
     * @return int
     */
    public function store(Request $request) : int
    {
        $game = $request->all();
        $lastGameId = Game::getLastId();

        if ($game['player_name'] == null || trim($game['player_name']) == '') {
            $game['player_name'] = Game::Guest . (1 + $lastGameId);
        }
        Game::create($game);

        return $lastGameId;
    }

    /**
     * Display the specified resource.
     *
     * @param $level
     * @return Collection
     */
    public function show(string $level) : Collection
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
     * @param int $id
     * @return void
     */
    public function update(Request $request, int $id) : void
    {
        $game = Game::find($request->get('id'));
        if ($image = $request->all()['image']) {
            $imagePath = Storage::disk(Game::uploadPath)->put(Game::uploadPhotosFolder, $image);
            $game['image_path'] = $imagePath;
        }
        $game->save();
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
