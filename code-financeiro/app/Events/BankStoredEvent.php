<?php

namespace CodeFin\Events;

use CodeFin\Models\Bank;
use Illuminate\Http\UploadedFile;

class BankStoredEvent
{

    private $bank;
    private $logo;

    /**
     * Create a new event instance.
     *
     * @param Bank $bank
     * @param UploadFile $logo
     */
    public function __construct(Bank $bank, UploadedFile $logo = null)
    {
        $this->bank = $bank;
        $this->logo = $logo;
    }

    public function getBank()
    {
        return $this->bank;
    }

    public function getLogo()
    {
        return $this->logo;
    }

}
