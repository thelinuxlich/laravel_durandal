<?php
class Role extends Base {

    public function users() {
        return $this->hasMany("User");
    }
}
