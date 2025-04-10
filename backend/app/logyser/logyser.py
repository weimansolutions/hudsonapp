import requests, json, os
from dotenv import load_dotenv
from datetime import date 

load_dotenv()

client = os.getenv("LOGYSER_CLIENT")
apikey = os.getenv("LOGYSER_APIKEY")
url_base= "https://apis.logyser.com.ar/"

def get_stock_logyser():
    endpoint = "getstockgimsa"
    url = url_base + endpoint

    payload = {}
    headers = {
    'client': client,
    'apikey': apikey
    }

    response = requests.request("GET", url, headers=headers, data=payload)
    clean_text = response.content.decode("utf-8-sig")  

    return json.loads(clean_text)

def get_pedidos_finalizados_fecha(fecha: date):
    endpoint = "getpedidosfinalizadosgimsa"
    url = url_base + endpoint

    payload = {}
    headers = {
    'client': client,
    'apikey': apikey,
    'fecha' : fecha.strftime("%Y-%m")
    }
    
    response = requests.request("GET", url, headers=headers, data=payload)
    clean_text = response.content.decode("utf-8-sig")  

    return json.loads(clean_text)

def get_pedido_finalizado(pedido: int):
    endpoint = "getpedidofinalizadosgimsa"
    url = url_base + endpoint

    payload = {}
    headers = {
    'client': client,
    'apikey': apikey,
    'pedido': pedido
    }

    response = requests.request("GET", url, headers=headers, data=payload)
    clean_text = response.content.decode("utf-8-sig")  

    return json.loads(clean_text)

def get_pedidos_en_preparacion():
    endpoint = "getpedidosenpreparaciongimsa"
    url = url_base + endpoint

    payload = {}
    headers = {
    'client': client,
    'apikey': apikey
    }

    response = requests.request("GET", url, headers=headers, data=payload)
    clean_text = response.content.decode("utf-8-sig")  

    return json.loads(clean_text)

def get_estado_entrega_fecha(fecha: date):
    endpoint = "getestadoentregagimsa"
    url = url_base + endpoint

    payload = {}
    headers = {
    'client': client,
    'apikey': apikey,
    'fecha' : fecha.strftime("%Y-%m")
    }

    response = requests.request("GET", url, headers=headers, data=payload)
    clean_text = response.content.decode("utf-8-sig")  

    return json.loads(clean_text)

def get_estado_entrega_pedido(pedido: str):
    endpoint = "getestadoentregapedidogimsa"
    url = url_base + endpoint

    payload = {}
    headers = {
    'client': client,
    'apikey': apikey,
    'pedido': pedido
    }

    response = requests.request("GET", url, headers=headers, data=payload)
    clean_text = response.content.decode("utf-8-sig")  

    return json.loads(clean_text)

