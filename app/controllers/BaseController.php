<?php

class BaseController extends Controller implements ArrayAccess {

    public $resource = "";
    public $captions = array();
    public $datatable = array("fields" => array(),"actions" => array());

    public function __construct() {
        $this->resource = str_replace("Controller","",get_called_class());
    }

	protected function setupLayout()
	{
		if ( ! is_null($this->layout))
		{
			$this->layout = View::make($this->layout);
		}
	}

    public function &get($name) {
        return $this->{$name};
    }

    public function offsetGet($offset) {
        return $this->get($offset);
    }

    public function set($name, $value) {}
    public function offsetSet($offset, $value) {}
    public function offsetExists($offset) {}
    public function offsetUnset($offset) {}
}