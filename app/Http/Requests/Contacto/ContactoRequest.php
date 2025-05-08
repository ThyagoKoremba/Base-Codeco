<?php

namespace App\Http\Requests\Contacto;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ContactoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "car"=> "regex:/^[\p{N}]{1,6}$/u",
            "apellidorazonsocial"=> "required|regex:/^[\p{L}\d\s\.\-]{1,100}$/u",
            "nombrefantasia"=> "required|regex:/^[\p{L}\d\s\.\-]{1,100}$/u",
            "nombresegundo"=> "required|regex:/^[\p{L}\s]{1,55}$/u",
            "fechanacimiento"=> "nullable|before_or_equal:today",
            "fechafallecimiento"=> "nullable|after_or_equal:fechanacimiento",
            "tratamiento"=> "regex:/^[\p{L}\d\s\.\-]{1,45}$/u",
            "id_personal_dato"=> "required|regex:/^[\p{N}\p{L}]{1,50}$/u",
            "id_identidadtributaria_dato"=> "regex:/^[\p{N}\p{L}]{1,50}$/u",
            "telefono_numero"=>"regex:/^[\p{N}\p{L}]{1,50}$/u",
            "mail_direccion"=> "required|email",
            "direccion_calle"=>"regex:/^[\p{N}\p{L}\s]{1,255}$/u",
            "codigo_postal"=>"regex:/^[\p{N}\p{L}]{1,20}$/u",
        ];
    }
}
