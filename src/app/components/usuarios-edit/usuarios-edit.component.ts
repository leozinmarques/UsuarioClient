import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Escolaridade } from 'src/app/models/escolaridade';
import { UsuariosService } from 'src/app/services/usuarios.service';
import * as moment from 'moment';

@Component({
  selector: 'app-usuarios-edit',
  templateUrl: './usuarios-edit.component.html',
  styleUrls: ['./usuarios-edit.component.css']
})
export class UsuariosEditComponent implements OnInit {

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
    private route: ActivatedRoute,
    private router: Router) {
      this.formBuilder = this.injector.get(FormBuilder);
      this.dpConfig.dateInputFormat = "DD/MM/YYYY"
      this.getUsuario(this.route.snapshot.paramMap.get('id'));
     }

  ngOnInit(): void {
    this.buildResourceForm();
  }

  protected buildResourceForm() {
    this.usuariosForm = this.formBuilder.group({
      id: [null, Validators.required],
      nome: [null, Validators.compose([Validators.required, Validators.maxLength(10)])],
      sobrenome: [null, Validators.compose([Validators.required, Validators.maxLength(10)])],
      email: [null, Validators.compose([Validators.email,Validators.required, Validators.maxLength(100)])],
      dataNascimento: [null, Validators.compose([Validators.required, this.dateValidator])],
      escolaridade: [null, Validators.required],
    });
  }

  getUsuario(id): void {
    
    this.usuarioService.get(id).subscribe( (data) => {
      this.usuariosForm.patchValue({
        ...data,
        dataNascimento: new Date(data.dataNascimento)
      })
    }, (error) => {
      console.log(error)
      this.router.navigate(['/usuarios'])
    })
  }

  atualizarUsuario(): void {
    this.usuarioService.update(this.usuariosForm.value).subscribe(
      (res) => {
        console.log(res)
        this.router.navigate(['/usuarios'])
      }
    )
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
