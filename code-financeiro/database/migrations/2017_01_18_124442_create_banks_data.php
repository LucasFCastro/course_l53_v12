<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Http\UploadedFile;

class CreateBanksData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /** @var codeFin\Repositories\BankRepository $repository */
        $repository = app(\CodeFin\Repositories\BankRepository::class); //helper app, para passar o serviço que o laravel gere
        foreach ($this->getData() as $bankArray) {
            $repository->create($bankArray);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

    }

    public function getData()
    {
        return [
               [
               'name' => 'Caixa Econômica Federal',
               'logo' => new UploadedFile(storage_path('app/files/banks/logos/caixa.png'), 'caixa.png'),
           ],
               [
               'name' => 'Banco do Brasil',
               'logo' => new UploadedFile(storage_path('app/files/banks/logos/bb.jpg'), 'bb.jpg'),
           ],
               [
               'name' => 'Santander',
               'logo' => new UploadedFile(storage_path('app/files/banks/logos/santander.png'), 'santander.png'),
           ],
               [
               'name' => 'Bradesco',
               'logo' => new UploadedFile(storage_path('app/files/banks/logos/bradesco.png'), 'bradesco.png'),
           ],
               [
               'name' => 'Itaú',
               'logo' => new UploadedFile(storage_path('app/files/banks/logos/Itaú.png'), 'Itaú.png'),
           ],
       ];
    }
}
