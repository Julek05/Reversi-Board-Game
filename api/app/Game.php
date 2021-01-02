<?php

declare(strict_types=1);

namespace App;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

final class Game extends Model
{
    protected $fillable = [
        'player_name',
        'level',
        'player_points',
        'computer_points',
        'image_path',
        'user_id'
    ];

    public const PLAYER_DEFAULT_NAME = 'Gracz';
    private const BASE_UPLOAD_DIRECTORY = 'public_uploads';
    public const UPLOAD_IMAGES_DIRECTORY = 'images';
    public const AMOUNT_OF_GAMES_TO_LEVEL = 10;

    public const LEVELS_DICTIONARY = [
        'latwy' => 'easy',
        'sredni' => 'middle',
        'trudny' => 'hard'
    ];

    public static function getBestGames(string $level): Collection
    {
        return self::select('id', 'player_name', 'level', 'player_points',
            'computer_points', 'image_path', 'created_at')
            ->where('level', $level)
            ->orderByRaw('player_points - computer_points DESC')
            ->take(self::AMOUNT_OF_GAMES_TO_LEVEL)
            ->get();
    }

    public static function getLastId(): int
    {
        if (self::count() == 0) {
            return 0;
        } else {
            return self::select('id')
                ->orderByDesc('id')
                ->first()
                ->id;
        }
    }

    public static function saveImage(UploadedFile $image, int $gameId): bool
    {
        try {
            $imagePath = Storage::disk(self::BASE_UPLOAD_DIRECTORY)->put(self::UPLOAD_IMAGES_DIRECTORY, $image);
            self::where($gameId)->update(['image_path' => $imagePath]);
            return true;
        } catch (\Exception $e) {
            //TODO usunac w tym miejscu zdjecie z dysku
            Log::info('save image failed: ' . $e->getMessage());
            return false;
        }
    }
}
