<?php

class RoleController extends RestController {
    public $captions = array("new" => "Novo Nível","update" => "Atualizar Nível");
    public $datatable = array(
        "fields" => array('#' => 'id','Nome' => 'name','Descrição' => 'description'),
        "actions" => array("Excluir")
    );
}