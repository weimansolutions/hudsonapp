from app.database import db
import requests, json, os
from datetime import date

def stock_actual():
    conn = db.get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM appStock")
    columns = [column[0] for column in cursor.description]
    results = [dict(zip(columns, row)) for row in cursor.fetchall()]
    conn.close()
    return results

def get_pedidos():
    conn = db.get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM logyser_pedidos_enviados")
    columns = [column[0] for column in cursor.description]
    results = [dict(zip(columns, row)) for row in cursor.fetchall()]
    conn.close()
    return results

def get_seguimiento_pedidos_logistica(fecha_desde: date, fecha_hasta: date):
    conn = db.get_connection()
    cursor = conn.cursor()

    query = """
        SELECT * 
        FROM zmcLogisticaSeguimientoDetalle
        WHERE fecha_pedido >= ? AND fecha_pedido <= ?
        ORDER BY fecha_pedido ASC;
    """

    cursor.execute(query, (fecha_desde, fecha_hasta))

    columns = [column[0] for column in cursor.description]
    results = [dict(zip(columns, row)) for row in cursor.fetchall()]

    conn.close()
    return results
