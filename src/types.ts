
export enum Tipo {
    Small = "Small",
    Medium = "Medium",
    Large = "Large",
    X_large = "X_large"
  }
  
  export interface Marca {
    idMarca: number;
    nomMarca: string;
    modelo?: string;
    año?: number;
  }
  
  export interface Bus {
    idBus: number;
    numBus: string;
    placa: string;
    caracteristicas: string;
    marca: Marca;
    estado: string;
    fechaCreacion: string;
    tipo: Tipo;
  }
  
  export interface BusPaginadoResponse {
    mensaje: string;
    fecha: string;
    status: number;
    buses: Bus[];
    paginaActual: number;
    totalBuses: number;
    totalPaginas: number;
  }
  
  export interface BusDetalleResponse {
    mensaje: string;
    fecha: string;
    status: number;
    bus: Bus;
  }