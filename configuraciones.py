from distutils.command.config import config
from matplotlib.pyplot import cla


class Desarrollo():
    DEBUG = True
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = ''
    MYSQL_DB = 'agenda'

config = {
    'llave' : Desarrollo
}