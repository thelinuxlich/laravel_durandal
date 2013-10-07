<?php
class Permission extends Base {
	protected $appends = array('action_read_formatted','action_write_formatted','action_remove_formatted');
    protected $guarded = array("id","created_at","updated_at",'action_read_formatted','action_write_formatted','action_remove_formatted');

    public function role() {
       return $this->belongsTo("Role");
    }

    public function scopeAllWithRole($query) {
        return $query->join("roles","permissions.role_id","=","roles.id")->select(array("permissions.*","roles.name as role_name"));
    }

    public function setActionWriteAttribute($value)
    {
        $value = var_export($value,true);
        $this->attributes["action_write"] = ($value == "'true'" || $value == "'1'" ? 1 : 0);
    }

    public function setActionReadAttribute($value)
    {
        $value = var_export($value,true);
        $this->attributes["action_read"] = ($value == "'true'" || $value == "'1'" ? 1 : 0);
    }

    public function setActionRemoveAttribute($value)
    {
        $value = var_export($value,true);
        $this->attributes["action_remove"] = ($value == "'true'" || $value == "'1'" ? 1 : 0);
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
