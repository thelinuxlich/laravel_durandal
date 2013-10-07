<?php
class User extends Base {

    protected $hidden = array('password');

    public function role() {
        return $this->belongsTo("Role");
    }

    public function scopeAllWithRole($query) {
        return $query->join("roles","users.role_id","=","roles.id")->select(array("users.*","roles.name as role_name"));
    }

    public function permissions() {
        return Permission::where("role_id",$this->role_id)->get();
    }
}