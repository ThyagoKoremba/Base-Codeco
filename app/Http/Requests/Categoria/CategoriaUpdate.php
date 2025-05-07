<?php

namespace App\Http\Requests\Categoria;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class CategoriaUpdate extends FormRequest
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
            'descripcion'=>[
            'required',
            'max:45',
            Rule::unique('categorias','descripcion')->ignore($this->categoria->id)],
            'abreviatura'=>[
                'required',
                'max:10',
                Rule::unique('categorias','abreviatura')->ignore($this->categoria->id)],
            'sn_registrosistema'=>'boolean',
            'sn_activo'=>'boolean',
        ];
    }
}
