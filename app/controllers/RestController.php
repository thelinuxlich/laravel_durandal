<?php
class RestController extends BaseController {
    public function getIndex() {
        return Response::json(array_merge($this["datatable"],array("new_button_name" => $this["new_button_name"],"data" => $this["resource"]::all()->toArray())));
    }

    public function postCreate() {
        return $this->save(new $this["resource"]);
    }

    public function getNew() {
        $table = strtolower(str_plural($this["resource"]));
        $schema = \DB::getDoctrineSchemaManager($table);
        $columns = $schema->listTableColumns($table);
        $data = array();
        foreach ($columns as $column) {
            $data[$column->getName()] = $column->getDefault();
        }
        return Response::json($data);
    }

    public function getShow($id) {
        return Response::json($this["resource"]::find($id));
    }

    public function save($obj) {
        try {
            $obj->fill(Input::all())->save();
            return Response::json(array("status" => true,"msg" => "Registro gravado com sucesso."));
        } catch(Exception $e) {
            return Response::json(array("status" => false,"msg" => "Ocorreu um erro ao tentar gravar o registro."));
        }
    }

    public function postUpdate($id) {
        return $this->save($this["resource"]::find($id));
    }

    public function postDestroy($id) {
        try {
            $this["resource"]::destroy($id);
            return Response::json(array("status" => true));
        } catch(Exception $e) {
            return Response::json(array("status" => false,"msg" => "Não foi possível remover o registro."));
        }
    }
}