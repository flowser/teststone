<?php


use App\Models\Users\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'first_name'        => 'Eng. Felix',
            'last_name'         => 'Nyachio',
            'email'             => 'felixnyachio@gmail.com',
            'password'          => Hash::make('flx4life'),
            'confirmation_code' => md5(uniqid(mt_rand(), true)),
            'confirmed'         => true,
        ]);
    }
}
