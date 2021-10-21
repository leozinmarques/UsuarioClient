import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { Escolaridade } from 'src/app/models/escolaridade';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-add-usuarios',
  templateUrl: './add-usuarios.component.html',
  styleUrls: ['./add-usuarios.component.css']
})
export class AddUsuariosComponent implements OnInit {

  public resEscolaridade: Escolaridade[] = [
    { escolaridade: 1, descricao: 'Infantil'},
    { escolaridade: 2, descricao: 'Fundamental'},
    { escolaridade: 3, descricao: 'Médio'},
    { escolaridade: 4, descricao: 'Superior'}
  ]

  usuariosForm: FormGroup;

  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  protected formBuilder: FormBuilder;

  constructor(protected injector: Injector,
    private usuarioService: UsuariosService,
    private router: Router) {
    this.formBuilder = this.injector.get(FormBuilder);
   }

  ngOnInit(): void {
    this.buildResourceForm();

    // Configurando os datepickers
    this.dpConfig.showWeekNumbers = false;
    this.dpConfig.dateInputFormat = 'DD/MM/YYYY';
  }

  protected buildResourceForm() {
    this.usuariosForm = this.formBuilder.group({
      nome: [null, Validators.required],
      sobrenome: [null, Validators.required],
      email: [null, Validators.compose([Validators.email,Validators.required])],
      dataNascimento: [null, Validators.compose([Validators.required, this.dateValidator])],
      escolaridade: [null, Validators.required],
    });
  }

  salvarUsuario(): void {
    this.usuarioService.create(this.usuariosForm.value).subscribe( () => {
      this.router.navigate(['/usuarios'])
    })
  }

  dateValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value) {
      const date = moment(control.value);
      const today = moment();

      if (today.isBefore(date)) {
        return { 'invalidDate': true }
      }
    }
    return null;
  }

}
