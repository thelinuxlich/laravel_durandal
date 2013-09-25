<?php
class Role extends Base {

    public function users() {
        $this->hasMany("User");
    }
}
