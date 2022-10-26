<?php

declare(strict_types=1);

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

final class Game extends Model
{
    use HasFactory;

    protected $fillable = [
        'level',
        'player_points',
        'computer_points',
        'image_path',
        'user_id'
    ];

    public const BASE_UPLOAD_DIRECTORY = 'public_uploads';
    public const UPLOAD_IMAGES_DIRECTORY = 'images';
    public const AMOUNT_OF_GAMES_TO_LEVEL = 10;

    public const LEVELS = ['easy', 'middle', 'hard'];
}
