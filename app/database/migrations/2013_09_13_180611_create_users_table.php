<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users', function(Blueprint $table)
		{
			$table->increments('id');
            $table->string("name")->nullable(false);
            $table->string("email")->nullable(false);
            $table->string("password")->nullable(false);
            $table->string("avatar")->default("");
            $table->boolean("status")->nullable(false)->default(1);
            $table->dateTime("last_login_at")->nullable(true);
            $table->integer("role_id")->unsigned();
            $table->foreign('role_id')->references('id')->on('roles');
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
		Schema::drop('users');
	}

}
