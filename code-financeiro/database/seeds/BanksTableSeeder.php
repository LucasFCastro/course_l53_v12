<?php

use Illuminate\Database\Seeder;

use CodeFin\Models\Bank;

class BanksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Bank::class, 10)->create();
    }
}
