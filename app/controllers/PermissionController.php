<?php
class PermissionController extends RestController {

    public $captions = array("new" => "Nova Permissão","update" => "Atualizar Permissão");
    public $datatable = array(
        "fields" => array('#' => 'id','Recurso' => 'resource','Nível' => 'role_name','Leitura' => 'action_read_formatted','Gravação' => 'action_write_formatted','Remoção' => 'action_remove_formatted'),
        "actions" => array("Excluir")
    );

    public function getIndex()
    {
        return Response::json(array_merge($this["datatable"],array("caption" => $this["captions"]["new"],"data" => Permission::allWithRole()->get()->toArray())));
    }
}