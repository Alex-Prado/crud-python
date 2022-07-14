
from flask import Flask, render_template, json, request
from flask_mysqldb import MySQL
# from configuraciones import config
from validaciones import *

app = Flask(__name__)
# conexion = MySQL(app)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'agenda'
conexion = MySQL(app)

@app.route('/')
def index():
    return render_template('index.html')


def consultar_db(codigo):
    conectar = conexion.connection.cursor()
    nro = filtrar_numeros(codigo)
    sql = 'SELECT * FROM contacto WHERE idcontacto = {0}'.format(nro)
    conectar.execute(sql)
    datos = conectar.fetchone()
    if datos != None:
        return datos
    else:
        return None


@app.route('/actualizar/<codigo>', methods=['PUT'])
def actualizar(codigo):
    datos = consultar_db(codigo)
    if datos != None:
        nombre = filtrar_caracteres(request.json['nombre'])
        apellido = filtrar_caracteres(request.json['apellido']).title()
        telefono = filtrar_numeros(request.json['telefono'])

        if validar_texto(nombre) and validar_texto(apellido):
            if validar_numero(telefono):
                conectar = conexion.connection.cursor()
                sql = 'UPDATE contacto SET nombre = "{0}", apellido = "{1}", telefono = {2} WHERE idcontacto = {3}'.format(
                    nombre, apellido, telefono, codigo)
                conectar.execute(sql)
                conexion.connection.commit()
                return 'actualizado'
            else:
                return 'telefono'
        else:
            return 'nombre'
    else:
        return 'error'


@app.route('/mostrar/<codigo>')
def mostrar(codigo):
    datos = consultar_db(codigo)
    return json.dumps(datos)


@app.route('/agregar', methods=['POST'])
def agregar():
    nombre = filtrar_caracteres(request.json['nombre'])
    apellido = filtrar_caracteres(request.json['apellido'])
    telefono = filtrar_numeros(request.json['telefono'])
    if validar_texto(nombre) and validar_texto(apellido):
        if validar_numero(telefono):
            conectar = conexion.connection.cursor()

            sql = 'INSERT INTO contacto(nombre, apellido, telefono) VALUES ("{0}","{1}",{2})'.format(
                nombre, apellido, telefono)
            conectar.execute(sql)
            conexion.connection.commit()

            return 'agregado'
        else:
            return 'telefono'

    else:
        return 'nombre'


@app.route('/eliminar/<codigo>', methods=['DELETE'])
def eliminar(codigo):
    datos = consultar_db(codigo)
    if datos != None:
        dato = filtrar_numeros(codigo)
        conectar = conexion.connection.cursor()
        sql = 'DELETE FROM contacto WHERE idcontacto = {0}'.format(dato)
        conectar.execute(sql)
        conexion.connection.commit()

        return 'eliminado'
    else:
        return 'error'


@app.route('/listar', methods=['GET'])
def listar_contactos():
    conectar = conexion.connection.cursor()
    sql = 'SELECT * FROM contacto'
    conectar.execute(sql)
    datos = conectar.fetchall()

    return json.dumps(datos)


if __name__ == '__main__':
    # app.config.from_object(config['llave'])
    app.run()
