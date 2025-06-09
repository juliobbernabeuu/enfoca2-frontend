export interface Foto {
  id_foto: number;
  id_usuario: number;
  id_categoria: number;
  titulo: string;
  url: string;
  descargable: boolean;
  fecha: string;
  localizacion_nombre?: string;
  precio?: number | null;
}
