<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePermissionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('permissions', function(Blueprint $table)
		{
			$table->increments('id');
            $table->string("resource")->nullable(false);
            $table->boolean("action_read")->nullable(false)->default(0);
            $table->boolean("action_write")->nullable(false)->default(0);
            $table->boolean("action_remove")->nullable(false)->default(0);
            $table->integer("role_id")->unsigned();
            $table->foreign("role_id")->references("id")->on("roles");
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('permissions');
	}

}
