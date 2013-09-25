<?php

class AccountController extends BaseController {

    public function postLogin() {
        $user = User::where("email",Input::get("email"))->first();
        if($user && Hash::check(Input::get("password"),$user->password)) {
            Session::put("user",array("id" => $user->id,"name" => $user->name));
            return Response::json(array("username" => $user->name,"permissions" => $user->permissions()->toArray(),"status" => true,"msg" => "Você conectou no sistema"));
        } else {
            return Response::json(array("status" => false,"msg" => "Usuário e/ou senha inválida"));
        }
    }

    public function postLogoff() {
        Session::forget("user");
    }

    public function getSession() {
        $user = Session::get("user");
        if($user) {
            $permissions = User::find($user["id"])->permissions();
            $authorized = false;
            $resource = null;
            $action = Input::get("action");
            foreach($permissions as $p) {
                if($p->resource == Input::get("resource")) {
                    $resource = $p->resource;
                    $authorized = ($action == "index" && $p->action_read == 1) || ($action == "remove" && $p->action_remove == 1) || (in_array($action,array("new","edit")) && $p->action_write == 1);
                    break;
                }
            }
            if($resource == null) {
                $authorized = true;
            }
            return Response::json(array("status" => true,"username" => $user["name"],"authorized" => $authorized,"permissions" => $permissions->toArray()));
        } else {
            return Response::json(array("status" => false));
        }
    }

    public function postPassword() {
        $user = User::where("email",Input::get("email"))->first();
        if($user) {
            $user->password = Hash::make(str_random(6));
            $user->save();
            Mail::send('emails.password', array("password" => $randomString), function($message)
            {
                $message->to(Input::get("email"), Input::get("email"))->subject('[Repensadores] Sua senha de acesso');
            });
            Response::json(array("status" => true,"msg" => "Um e-mail foi enviado, verifique sua caixa de entrada."));
        } else {
            Response::json(array("status" => false,"msg" => "Ocorreu um erro ao tentar enviar um e-mail, cheque o endereço e tente novamente."));
        }
    }
}
