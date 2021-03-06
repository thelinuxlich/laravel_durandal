<?php
use Carbon\Carbon;
class Base extends Eloquent {
    protected $guarded = array("id","created_at","updated_at","last_login_at");
    public static $rules = array();

    public function getCreatedAtAttribute($value)
    {
        $date = new Carbon($value);
        return $date->format("d/m/Y h:i");
    }

    public function getUpdatedAtAttribute($value)
    {
        $date = new Carbon($value);
        return $date->format("d/m/Y h:i");
    }

    public function getLastLoginAtAttribute($value)
    {
        $date = new Carbon($value);
        return $date->format("d/m/Y h:i");
    }

    public function toArrayWithMutators() {
        $array = parent::toArray();
        foreach ($this->getMutatedAttributes() as $key) {
            if(!array_key_exists($key, $array)) {
                $array[$key] = $this->{$key};
            }
        }
        return $array;
    }
}