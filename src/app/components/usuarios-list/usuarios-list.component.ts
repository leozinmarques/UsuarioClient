import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {

  public usuarios: Array<Usuario>[];
  public dtOptions: DataTables.Settings

  constructor(private usuarioService: UsuariosService) { 
    this.dtOptions = {
      responsive: true,
      stateSave: false,
      'order': []
    };
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(): void{
    this.usuarioService.getAll()
      .subscribe(
        data => {
          this.usuarios = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  getEscolaridade(escolaridade): string {
    return this.usuarioService.Escolaridade.find(x => x.escolaridade === escolaridade).descricao
  }

  deletarUsuario(usuario): void {
    this.usuarioService.delete(usuario.id).subscribe(
      () => {
        this.getUsuarios();
      }
    )
  }

}
