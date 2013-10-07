<?php

class UserController extends RestController {

    public $captions = array("new" => "Novo Usuário","update" => "Atualizar Usuário");
    public $datatable = array(
        "fields" => array('#' => 'id','Nome' => 'name','E-mail' => 'email','Nível' => 'role_name','Último Login' => 'last_login_at','Data de Criação' => 'created_at','Status' => 'status'),
        "actions" => array("Excluir")
    );

	public function getIndex()
	{
        return Response::json(array_merge($this["datatable"],array("caption" => $this["captions"]["new"],"data" => User::allWithRole()->get()->toArray())));
	}

	public function postCreate()
	{
        return $this->save(User::create(array("password" => Hash::make($_POST["password"])) + $_POST));
	}

    public function save($user) {
        try {
            if(Input::hasFile("avatar")) {
                $filename = Input::file("avatar")->getClientOriginalName();
                $upload_dir = dirname(__FILE__)."/../../public/img/avatars/".$user->id."/";
                is_dir($upload_dir) || mkdir($upload_dir);
                Input::file("avatar")->move($upload_dir,$filename);
                $user->avatar = "img/avatars/".$user->id."/".$filename;
            }
            $user->save();
            return Response::json(array("status" => true,"msg" => "Usuário gravado com sucesso."));
        } catch(Exception $e) {
            return Response::json(array("status" => false,"msg" => "Ocorreu um erro ao tentar gravar o usuário."));
        }
    }

	public function postUpdate($id)
	{
        return $this->save(User::find($id)->fill($_POST));
	}

    public function postUpdateStatus($id) {
        try {
            $user = User::find($id)->update(array("status" => ($user->status == 1 ? 0 : 1)));
            return Response::json(array("status" => true));
        } catch(Exception $e) {
            return Response::json(array("status" => true,"msg" => "Não foi possível mudar o status."));
        }
    }
}
