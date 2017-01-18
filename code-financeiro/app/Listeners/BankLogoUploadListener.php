<?php

namespace CodeFin\Listeners;

use CodeFin\Events\BankStoredEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

use CodeFin\Repositories\BankRepository;
use CodeFin\Models\Bank;

class BankLogoUploadListener
{

    private $repository;

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct(BankRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Handle the event.
     *
     * @param  BankStoredEvent  $event
     * @return void
     */
    public function handle(BankStoredEvent $event)
    {
        $bank = $event->getBank();
        $logo = $event->getLogo();

        $name = md5(time()) . "." . $logo->guessExtension();
        $destFile = Bank::logosDir();

        \Storage::disk('public')->putFileAs($destFile, $logo, $name);

        $this->repository->update(['logo' => $name], $bank->id);
    }
}