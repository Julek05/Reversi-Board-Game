<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

final class StoreGameRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'level' => 'required|string|in:easy,middle,hard',
            'player_points' => 'required|integer',
            'computer_points' => 'required|integer',
        ];
    }
}
