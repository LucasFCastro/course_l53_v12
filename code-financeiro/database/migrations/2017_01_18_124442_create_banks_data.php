<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Http\UploadedFile;
use CodeFin\Repositories\BankRepository;
use CodeFin\Models\Bank;

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
        $repository = app(BankRepository::class);
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
        $repository = app(BankRepository::class);
        for ($index = 1; $index < count($this->getData()); $index++) {
            $model = $repository->find($index);
            if ($model) {
                $destFile = Bank::logosDir(). '/' . $model->logo;
                \Storage::disk('public')->delete($destFile);
            }            
        }
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
