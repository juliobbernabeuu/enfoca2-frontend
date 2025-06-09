export interface Usuario {
  id_usuario: number;
  rol: string;
  email: string;
  nombre?: string;
  exp: number;
  bloqueado_hasta?: string;
}
