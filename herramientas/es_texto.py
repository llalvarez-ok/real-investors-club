"""Texto en español para las herramientas de análisis de RIC (ganchos, títulos, guiones).

Las listas de palabras están pensadas para el nicho de RIC (finanzas, inversión, estafas) y para "tú" neutro.
Todas las comparaciones se hacen sin tildes y en minúsculas, así "Pérdida" y "perdida" cuentan igual.
"""
import re
import unicodedata


def sin_tildes(t: str) -> str:
    return "".join(c for c in unicodedata.normalize("NFD", t) if unicodedata.category(c) != "Mn")


def palabras(t: str) -> list:
    """Palabras en minúsculas y sin tildes, con los números y el % pegados."""
    return re.findall(r"[a-zñ0-9%$.,']+", sin_tildes(t.lower()).replace("ñ", "n"))


def limpias(t: str) -> list:
    return [p.strip(".,'") for p in palabras(t) if p.strip(".,'")]


# Palabras que no dicen nada en un título o un gancho
VACIAS = set("""el la los las un una unos unas de del al a en y o u que con por para es son se lo le les mi mis tu tus
su sus este esta esto estos estas ese esa eso como cuando mas muy ya no si sin sobre entre hasta desde pero""".split())

# Adjetivos que prometen sin decir nada: mejor cambiarlos por un número, un nombre o una fecha
VAGAS = set("""increible increibles impresionante brutal locura loco secreto secretos definitivo definitiva mejor mejores
enorme gigante unico unica revolucionario revolucionaria epico epica total perfecto perfecta
completo completa todo nunca visto""".split())

# Relleno de arranque: lo que nunca debería estar en los primeros 5 segundos
RELLENO = set("""hola bienvenidos bienvenido bienvenida bueno basicamente literalmente realmente simplemente hoy video
canal suscribete chicos amigos gente""".split())

# Dirigirse al espectador con "tú": pronombres y verbos frecuentes en segunda persona
TU = re.compile(r"\b(tu|tus|te|ti|contigo|tuyo|tuya|tuyos|tuyas|tienes|puedes|sabes|quieres|haces|pierdes|ganas|vendes|"
                r"compras|inviertes|crees|sientes|necesitas|aceptas|aceptarias|caerias|comprarias|imagina|piensa|supon|"
                r"fijate|mira|hazte|eres|estas|vas)\b")

# Lo que está en juego en finanzas personales
RIESGO = re.compile(r"\b(perd\w*|pierd\w*|estafa\w*|humo|riesgo\w*|cuesta\w*|costo\w*|caro|caer|cae|cayo|quiebr\w*|"
                    r"error\w*|deuda\w*|ahorros?|cuidado|nunca|antes de|deja de|para de|trampa\w*|miedo|panico)\b")

# Lo que abre una pregunta en la cabeza
CURIOSIDAD = re.compile(r"\b(por que|porque|como|cual|cuanto|cuanta|que paso|nadie|casi|hasta que|salvo|excepto|"
                        r"en realidad|la verdad|lo que nadie|mientras|pero)\b")
CIERRA = re.compile(r"\b(es decir|o sea|por eso|asi que)\b")

CONCRETO = re.compile(r"\d[\d.,]*\s?(%|x|usd|dolares|mil|millones|anos|meses|semanas|dias|horas|minutos)?|\$\s?\d")

# Reglas editoriales de RIC
# Voseo que se distingue aun sin tildes (las formas que coinciden con el "tú" al sacar la tilde,
# como "mirá"/"mira" o "sabés"/"sabes", se buscan solo en el texto original con VOSEO_TILDE)
VOSEO = re.compile(r"\b(tenes|podes|queres|sos|vos|pensa|deci|veni|entende|inscribite|suscribite|registrate|che)\b")
# Formas de voseo con tilde (se buscan sobre el texto original, antes de sacar tildes)
VOSEO_TILDE = re.compile(r"\b(tenés|podés|sabés|querés|hacé|mirá|fijate|pensá|decí|andá|vení|escuchá|preguntate|"
                         r"suscribite|inscribite|registrate|desbloqueá|entendé|seguí|elegí|poné|sentite|ganás|perdés|vendés|comprás|"
                         r"invertís|creés|sentís|necesitás|aceptás|imaginá|suponé|hacete|decidís|entrás|salís|mirás|"
                         r"arriesgás|ahorrás|empezá|anotá|escribí|esperá|contame|decime)\b", re.I)
PALABRAS_PROHIBIDAS = {
    "temario": "regla: no decir \"temario\" dentro de las lecciones",
    "la ia": "regla: el presentador es Realy, nunca \"la IA\"",
    "el asistente": "regla: el presentador es Realy, nunca \"el asistente\"",
    "examen": "regla: no mencionar exámenes de certificación",
    "certificacion": "regla: no mencionar exámenes de certificación",
    "garantizo": "nunca prometer ganancias",
    "te garantizo": "nunca prometer ganancias",
    "compra ya": "nunca recomendaciones de compra o venta",
    "vende ya": "nunca recomendaciones de compra o venta",
    "tenes que comprar": "nunca recomendaciones de compra o venta",
    "tienes que comprar": "nunca recomendaciones de compra o venta",
    "tienes que vender": "nunca recomendaciones de compra o venta",
    "plata": "español neutro: decir \"dinero\"",
    "boliche": "español neutro",
}
# Palabras que Brian (voz multilingüe) lee con acento inglés o que le hacen cambiar de idioma la frase entera
RIESGO_PRONUNCIACION = {
    "resumiendo": "Brian la lee en inglés: usar \"Repasemos\"",
    "fear": "frase en inglés: Brian lee toda la oración con acento inglés",
    "missing": "frase en inglés: Brian lee toda la oración con acento inglés",
    "trading": "palabra en inglés: escuchar la escena antes de producir",
    "trader": "palabra en inglés: escuchar la escena antes de producir",
    "traders": "palabra en inglés: escuchar la escena antes de producir",
    "stop": "palabra en inglés: escuchar la escena antes de producir",
    "broker": "palabra en inglés: escribir \"bróker\" y escuchar la escena",
    "s&p": "Brian la lee \"es and pi\": aceptable, pero confirmar al escuchar",
    "online": "palabra en inglés: decir \"en línea\"",
    "reels": "palabra en inglés: escuchar la escena antes de producir",
}
