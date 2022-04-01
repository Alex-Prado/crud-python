
import re

def validar_caracteres(texto):
    # filtro = re.sub(r"[^a-zA-Z0-9]","",texto)
    filtro = re.sub(r"[^a-zA-Z]","",texto)
    return filtro


def validar_texto(texto):
    dato = validar_caracteres(texto)
    palabra = dato.strip()
    print(palabra.isalpha() and len(palabra) <= 15 and len(palabra) >= 1)

# validar_texto('   /*HOLA ---<;MUNDO `//////PYTHON*"')
# validar_texto('mundolocoslolo\n pollo')

texto = 'hola mundo'
dato = texto.title()
print(dato)