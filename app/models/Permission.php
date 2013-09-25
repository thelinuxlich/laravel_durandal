<?php
class Permission extends Base {
	protected $appends = array('action_read_formatted','action_write_formatted','action_remove_formatted');

    public function role() {
        $this->belongsTo("Role");
    }

    public function scopeAllWithRole($query) {
        return $query->join("roles","permissions.role_id","=","roles.id")->select(array("permissions.*","roles.name as role_name"));
    }

    public function setActionWriteAttribute($value)
    {
        $this->attributes["action_write"] = ($value ? 1 : 0);
    }

    public function setActionReadAttribute($value)
    {
        $this->attributes["action_read"] = ($value ? 1 : 0);
    }

    public function setActionRemoveAttribute($value)
    {
        $this->attributes["action_remove"] = ($value ? 1 : 0);
    }

    public function getActionWriteFormattedAttribute($value)
    {
        return ($this->attributes["action_write"] == 1 ? "Sim" : "Não");
    }

    public function getActionReadFormattedAttribute($value)
    {
        return ($this->attributes["action_read"] == 1 ? "Sim" : "Não");
    }

    public function getActionRemoveFormattedAttribute($value)
    {
        return ($this->attributes["action_remove"] == 1 ? "Sim" : "Não");
    }
}
