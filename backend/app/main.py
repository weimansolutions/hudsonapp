# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .isis import isis
from .logyser import logyser
from datetime import date
from .procesos import process

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def bienvenida():
    return "bienvenido"

@app.get("/stock")
def get_stock():
    return isis.stock_actual()

@app.get("/pedidos")
def get_pedidos():
    return isis.get_pedidos()

@app.get("/stockLogyser")
def get_stock_logyser():
    return logyser.get_stock_logyser()

@app.get("/pedidos_preparacion")
def get_pedidos_preparacion_logyser():
    data = logyser.get_pedidos_en_preparacion()
    return data

@app.get("/finalizado_fecha")
def get_pedidos_preparacion_logyser(fecha: date):
    data = logyser.get_pedidos_finalizados_fecha(fecha)
    return data

@app.get("/estado_entrega_fecha")
def get_estado_entrega_fecha_logyser(fecha: date):
    data = logyser.get_estado_entrega_fecha(fecha)
    return data

@app.get("/seguimiento_logistica")
def get_seguimiento_logistica(fecha_desde: date, fecha_hasta: date):
    data = process.armar_seguimiento(fecha_desde,fecha_hasta)
    return data
