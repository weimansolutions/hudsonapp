from ..logyser import logyser
from ..isis import isis
from datetime import date, datetime
from ..database import db
from collections import defaultdict

def armar_seguimiento(inicio,fin):

    pedidos = isis.get_seguimiento_pedidos_logistica(inicio, fin)
    en_preparacion = logyser.get_pedidos_en_preparacion()
    finalizados = logyser.get_pedidos_finalizados_fecha(inicio)
    entregas = logyser.get_estado_entrega_fecha(inicio)

    index_preparacion = {item["pedido"]: item["fecha_procesado"] for item in en_preparacion}
    index_finalizados = {item["pedido"]: item["fecha_finalizado"] for item in finalizados}

    index_entrega = {}

    agrupados = defaultdict(list)
    for item in entregas:
        agrupados[item["nro_pedido"]].append(item)

    for nro_pedido, registros in agrupados.items():
        # Ordenamos los estados por fecha (de más viejo a más nuevo)
        registros_ordenados = sorted(registros, key=lambda x: datetime.fromisoformat(x["fecha_estado"]))

        # El último es el estado actual
        estado_actual = registros_ordenados[-1]

        # Los anteriores son el historial
        historial = registros_ordenados[:-1]

        index_entrega[nro_pedido] = {
            "cliente": estado_actual["cliente"],
            "estado_actual": estado_actual,
            "historial": historial
        }

    for i in pedidos:
        

        i['fecha_procesado']=index_preparacion.get(i['pedido'])
        i['fecha_finalizado']=index_finalizados.get(i['pedido'])
        
        entrega = index_entrega.get(i['pedido'])
        if entrega:
            i['entrega_estado'] = entrega['estado_actual']['estado']
            i['entrega_fecha_estado'] = entrega['estado_actual']['fecha_estado']
            i['entrega_motivo'] = entrega['estado_actual']['motivo']
            i['entrega_fecha_update'] = entrega['estado_actual']['fecha_update']
            i['entrega_historial'] = entrega['historial']
        else:
            i['entrega_estado'] = None
            i['entrega_fecha_estado'] = None
            i['entrega_motivo'] = None
            i['entrega_fecha_update'] = None
            i['entrega_historial'] = None
        
    return pedidos