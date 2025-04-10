'use client';

import { useEffect, useState } from 'react';
import TablaFiltrable from '@/components/TablaFiltrable';

type StockItem = {
    cliente: string;
    idproducto: string;
    descripcion: string;
    estado: string;
    cantidad : number;
    fecha_update: string;
};

export default function StockPage() {
  const [data, setData] = useState<StockItem[]>([]);

  useEffect(() => {
    fetch('http://192.168.88.245:8000/stockLogyser')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <TablaFiltrable
      title="Stock de Logyser"
      data={data}
      visibleColumns={['idproducto','descripcion','estado','cantidad','fecha_update']}
      filterableFields={['cliente', 'estado','descripcion']} 
      numericalColumns={['cantidad']}
    />
  );
}
