<?php

class PermissionTableSeeder extends Seeder {

	public function run()
	{
		// Uncomment the below to wipe the table clean before populating
		DB::table('permissions')->delete();
        $role = Role::where("name", "admin")->first()->id;
        $resources = array('users','roles','permissions',"people","projects","objectives","themes","assets","articles");
        foreach($resources as $r) {
    		$permission = array(
                "action_read" => true,
                "action_write" => true,
                "action_remove" => true,
                "resource" => $r,
                "role_id" => $role,
                "created_at" => date('Y-m-d H:i:s'),
                "updated_at" => date('Y-m-d H:i:s')
    		);
    		// Uncomment the below to run the seeder
    		DB::table('permissions')->insert($permission);
        }
	}

}
