<?php

class RoleController extends RestController {
    public $new_button_name = "Novo Nível";
    public $datatable = array(
        "fields" => array('#' => 'id','Nome' => 'name','Descrição' => 'description'),
        "actions" => array("Excluir")
    );
}