<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Http\UploadedFile;
use CodeFin\Models\Bank;

class CreateBankLogoDefault extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $logo = new UploadedFile(
            storage_path('app/files/banks/logos/default.png'), 'default.png'
        );
        $name = env('BANK_LOGO_DEFAULT');
        $destFile = Bank::logosDir();

        \Storage::disk('public')->putFileAs($destFile, $logo, $name);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $name = env('BANK_LOGO_DEFAULT');
        $destFile = Bank::logosDir();
        \Storage::disk('public')->delete($destFile. '/' . $name);
    }
}
