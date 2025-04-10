# backend/app/db.py
import pyodbc, os
from fastapi import HTTPException
from dotenv import load_dotenv

load_dotenv()

db_driver = os.getenv("ISIS_DB_DRIVER")
db_server = os.getenv("ISIS_DB_SERVER")
db_database = os.getenv("ISIS_DB_DATABASE")
db_uid = os.getenv("ISIS_DB_UID")
db_pwd = os.getenv("ISIS_DB_PWD")

def get_connection():
    try:
        conn = pyodbc.connect(
            f'DRIVER={{{db_driver}}};'
            f'SERVER={db_server};'
            f'DATABASE={db_database};'
            f'UID={db_uid};PWD={db_pwd}'
        )
        return conn
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"DB Connection Error: {str(e)}")
