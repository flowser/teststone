<?php


use App\Models\Users\User;
use Illuminate\Database\Seeder;

class UserRolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::find(1)->assignRole('Superadmin');
    }
}
