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
        if ($logo) {

            $name = $bank->created_at == $bank->updated_at ? md5(time().$logo->getClientOriginalName()) . "." . $logo->guessExtension() : $bank->logo;
            $destFile = Bank::logosDir();

            $result = \Storage::disk('public')->putFileAs($destFile, $logo, $name);
            if ($result && $bank->created_at == $bank->updated_at) {
                $this->repository->update(['logo' => $name], $bank->id);
            }

        }
    }
}
