export default interface Articulo {
    CodigoBarras: string;
    Articulo: string;
    Descripcion: string;
    Disponible: string | number | null;
    Descripcion1: string;
    UnidadCompra: string;
    CantidadBodega: number;
    CantidadCompra: number;
    Rama: string;
    RamaDesc:string;
    Cantidad: number;
    Costo: number;
    Condiciones: string;
    Proveedor:string;
    Nombre:string;
    Decimales: number;
    Localizacion: string;
    Unidad: string;
    Debe:boolean;
}


