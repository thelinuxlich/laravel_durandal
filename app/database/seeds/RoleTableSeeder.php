<?php

class RoleTableSeeder extends Seeder {

	public function run()
	{
		// Uncomment the below to wipe the table clean before populating
		DB::table('roles')->delete();

		$role = array(
            "name" => "admin",
            "description" => "Administrador do Sistema",
            "created_at" => date('Y-m-d H:i:s'),
            "updated_at" => date('Y-m-d H:i:s')
		);

		// Uncomment the below to run the seeder
		DB::table('roles')->insert($role);
	}

}
