'use client';

import { useEffect, useState } from 'react';
import TablaFiltrable from '@/components/TablaFiltrable';

type StockItem = {
    pedido : number;
    cliente : string;
    razonsocial : string;
    sucursal : string;
    fecha_pedido : string;
    fecha_administracion : string;
    zona : string;
    NombreVendedor : string;
    facturas : number;
    remitos : number;
    Total_PedCliCab : number;
    importe_factura : number;
    canped1 : number;
    canped2 : number;
    canent1 : number;
    canent2 : number;
    fecha_procesado : string;
    fecha_finalizado : string;
    entrega_estado : string;
    entrega_fecha_estado : string;
    entrega_motivo : string;
    entrega_fecha_update : string;
    entrega_historial : string;
  
};

export default function StockPage() {
  const [data, setData] = useState<StockItem[]>([]);

  useEffect(() => {
    fetch('http://192.168.88.245:8000/seguimiento_logistica')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <TablaFiltrable
      title="Seguimiento Logistica"
      data={data}
      visibleColumns={['pedido', 'cliente', 'razonsocial', 'sucursal', 'fecha_pedido', 'fecha_administracion', 'zona', 'NombreVendedor', 'facturas', 'remitos', 'Total_PedCliCab', 'importe_factura', 'canped1', 'canped2', 'canent1', 'canent2', 'fecha_procesado', 'fecha_finalizado', 'entrega_estado', 'entrega_fecha_estado', 'entrega_motivo', 'entrega_fecha_update', 'entrega_historial']}
      filterableFields={['pedido', 'razonsocial', 'zona']} 
      numericalColumns={['pedido', 'facturas', 'remitos', 'Total_PedCliCab', 'importe_factura', 'canped1', 'canped2', 'canent1', 'canent2']}
    />
  );
}
