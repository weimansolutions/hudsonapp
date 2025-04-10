'use client';

import { useEffect, useState } from 'react';
import TablaFiltrable from '@/components/TablaFiltrable';

type StockItem = {
    codigo: string;
    'id externo': string;
    nombre: string;
    precio : number;
    activo: number;
    'codigo de barras': number;
    'unidad por bulto': number;
    'forzar multiplos': number;
    'Categoria 1 (id externo)': number;
    Stock: number;
    stock_isis: number;
    pendiente: number;
    categoria: string;
    Estado: string;
    deposito: string;
};

export default function StockPage() {
  const [data, setData] = useState<StockItem[]>([]);

  useEffect(() => {
    fetch('http://192.168.88.245:8000/stock')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <TablaFiltrable
      title="Stock de productos"
      data={data}
      visibleColumns={['codigo', 'id externo', 'nombre', 'precio', 'activo', 'codigo de barras', 'unidad por bulto', 'forzar multiplos', 'Categoria 1 (id externo)', 'Stock', 'stock_isis', 'pendiente', 'categoria', 'Estado', 'deposito']}
      filterableFields={['codigo', 'nombre','categoria','Estado']} 
      numericalColumns={['precio', 'activo', 'codigo de barras', 'unidad por bulto', 'forzar multiplos', 'Categoria 1 (id externo)', 'Stock', 'stock_isis', 'pendiente']}
    />
  );
}
