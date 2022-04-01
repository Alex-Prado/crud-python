import re
def filtrar_caracteres(texto):
    filtro = re.sub(r"[^a-zA-Z\s]", "", texto)
    filtro = filtro.replace('  ', ' ')
    filtro = filtro.strip()
    filtro = filtro.title()
    return filtro


def filtrar_numeros(codigo):
    filtro = re.sub(r"[^0-9]", "", codigo)
    return filtro


def validar_texto(texto):
    # return(palabra.isalpha() and len(palabra) <= 15 and len(palabra) >= 1)
    return(len(texto) <= 20 and len(texto) >= 1)



def validar_numero(codigo):
    dato = codigo.strip()
    return(dato.isnumeric() and len(dato) >= 1 and len(dato) <= 10)
