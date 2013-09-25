<?php

class UserTableSeeder extends Seeder {

	public function run()
	{
		// Uncomment the below to wipe the table clean before populating
		DB::table('users')->delete();

        $role = Role::where("name", "admin")->first()->id;

		$user = array(
            "name" => "Administrador",
            "password" => Hash::make("123456"),
            "email" => "admin@luego.com.br",
            "role_id" => $role,
            "created_at" => date('Y-m-d H:i:s'),
            "updated_at" => date('Y-m-d H:i:s')
		);

		// Uncomment the below to run the seeder
		DB::table('users')->insert($user);
	}

}
