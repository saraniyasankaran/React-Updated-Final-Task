import psycopg2

def dbConnect():
    return psycopg2.connect(
    host = "localhost",
    database = "backend",
    user = "postgres",
    password = "admin123" ,
    port = 5432 
)


