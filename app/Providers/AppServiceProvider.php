<?php

namespace App\Providers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        $this->bootMacros();
    }

    protected function bootMacros(): void
    {
        RedirectResponse::macro('withToast', function ($message) {
            return $this->with([
                'toast' => $message,
                'toast_nonce' => Str::uuid(),
            ]);
        });
    }
}
