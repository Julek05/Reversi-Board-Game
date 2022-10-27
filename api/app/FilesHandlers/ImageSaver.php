<?php

declare(strict_types=1);

namespace App\FilesHandlers;

use App\Exceptions\ImageSaveException;
use App\Game;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

final class ImageSaver
{
    private string $imagePath = '';

    /**
     * @throws ImageSaveException
     */
    public function save(UploadedFile $image): void
    {
        $result = Storage::disk(Game::BASE_UPLOAD_DIRECTORY)
            ->put(Game::UPLOAD_IMAGES_DIRECTORY, $image);

        if ($result === false) {
            throw new ImageSaveException();
        }

        $this->imagePath = sprintf('%s/%s', Game::UPLOAD_IMAGES_DIRECTORY, $image);
    }

    public function getImagePath(): string
    {
        return $this->imagePath;
    }
}
