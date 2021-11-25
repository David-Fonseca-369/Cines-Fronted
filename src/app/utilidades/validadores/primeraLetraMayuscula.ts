import { AbstractControl, ValidatorFn } from "@angular/forms";

export function primeraLetraMayuscula(): ValidatorFn{
	return (control: AbstractControl) => {
		const valor = <string>control.value; //obtengo el valor

		if(!valor) return; //si es nulo que no continue.
		if(valor.length === 0) return; //si está vacio que tampoco continue.

		const primeraLetra = valor[0];
		if(primeraLetra !== primeraLetra.toUpperCase()){ //si la primera letra es diferente de mayuscula
			return{ //retorno un objeto
				primeraLetraMayuscula:{ //nombre del error
					mensaje: 'La primera letra debe ser mayúscula.'
				}
			};
		}		
		return;
	}
}