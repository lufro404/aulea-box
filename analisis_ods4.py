
"""Análisis de datos ODS 4 con Pandas.
Fuente: UNESCO (niños y jóvenes sin escolarizar).
- datos_ods4.csv: desglose de 2024 por nivel y por sexo (millones).
- datos_evolucion.csv: cifras históricas de 2000, 2015 y 2024,
  y distribución regional de la población de secundaria alta.
Las cifras históricas son aproximadas.
"""

import pandas as pd
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

AZUL, AMARILLO, OSCURO = "#2f8fd8", "#f2b01e", "#10202f"


def limpiar(ax):
    for lado in ("top", "right"):
        ax.spines[lado].set_visible(False)


# =====================================================
# PARTE 1: desglose de 2024 por nivel y por sexo
# =====================================================

df = pd.read_csv("datos_ods4.csv")

print("TABLA COMPLETA")
print(df.to_string(index=False))

niveles = df[df["tipo"] == "nivel"]
sexos = df[df["tipo"] == "sexo"].set_index("grupo")

media = niveles["millones"].mean()
maximo = niveles.loc[niveles["millones"].idxmax()]
total = niveles["millones"].sum()

print("\nMedia de los tres niveles:", round(media, 1), "millones")
print("Valor máximo:", maximo["grupo"], "con", maximo["millones"], "millones")
print("Total (suma de niveles):", total, "millones")

orden = niveles.sort_values("millones")

print("\nORDENADO DE MENOR A MAYOR")
print(orden[["grupo", "millones"]].to_string(index=False))

niveles = niveles.assign(
    porcentaje=(niveles["millones"] / total * 100).round(1)
)

print("\nPORCENTAJE SOBRE EL TOTAL")
print(niveles[["grupo", "porcentaje"]].to_string(index=False))

print(
    "\nNiveles por encima de la media:",
    list(niveles[niveles["millones"] > media]["grupo"])
)

print(
    "Chicos menos chicas:",
    int(sexos.loc["Chicos", "millones"] - sexos.loc["Chicas", "millones"]),
    "millones"
)

fig, ax = plt.subplots(figsize=(8, 4.5))

barras = ax.bar(
    orden["grupo"],
    orden["millones"],
    color=[AZUL, AZUL, AMARILLO]
)

ax.axhline(media, color=OSCURO, linestyle="--", linewidth=1)
ax.text(-0.4, media + 3, f"Media: {media:.0f} M", fontsize=10)

for b in barras:
    ax.text(
        b.get_x() + b.get_width() / 2,
        b.get_height() + 2,
        f"{int(b.get_height())} M",
        ha="center",
        fontweight="bold"
    )

ax.set_title("Niños y jóvenes sin escolarizar en 2024, por nivel (millones)")
ax.set_ylabel("Millones")
ax.set_ylim(0, 150)

limpiar(ax)
fig.tight_layout()
fig.savefig("grafica_ods4.jpg", dpi=150)
plt.close(fig)

print("\nGráfica guardada: grafica_ods4.jpg")


# =====================================================
# PARTE 2: evolución 2000-2024
# =====================================================

ev = pd.read_csv("datos_evolucion.csv").set_index("dato")["valor"]

# Cargar los datos históricos
serie = pd.DataFrame({
    "anio": [2000, 2015, 2024],
    "millones": [
        ev["total_2000_millones"],
        ev["total_2015_millones"],
        ev["total_2024_millones"]
    ]
})

print("\n\nEVOLUCIÓN DE NIÑOS Y JÓVENES SIN ESCOLARIZAR")
print(serie.to_string(index=False))

# Calcular el cambio porcentual entre fechas
serie["cambio_pct"] = (serie["millones"].pct_change() * 100).round(1)

print("\nCambio porcentual entre fechas")
print(serie[["anio", "cambio_pct"]].to_string(index=False))

# Calcular media, máximo y mínimo
media_s = serie["millones"].mean()
max_s = serie.loc[serie["millones"].idxmax()]
min_s = serie.loc[serie["millones"].idxmin()]

print("\nMedia de la serie:", round(media_s, 1), "millones")
print("Máximo:", int(max_s["millones"]), "millones en", int(max_s["anio"]))
print("Mínimo:", int(min_s["millones"]), "millones en", int(min_s["anio"]))

# Ordenar de menor a mayor
print("\nORDENADO DE MENOR A MAYOR")
print(
    serie.sort_values("millones")[["anio", "millones"]].to_string(index=False)
)

# Filtrar los datos desde 2015
print(
    "\nDesde 2015 (filtro):",
    serie[serie["anio"] >= 2015]["millones"].tolist()
)

# Calcular la diferencia entre 2000 y 2024
dif = int(serie["millones"].iloc[0] - serie["millones"].iloc[-1])

print("Diferencia 2000-2024:", dif, "millones menos que en 2000")


# =====================================================
# DISTRIBUCIÓN REGIONAL DE SECUNDARIA ALTA
# =====================================================

sec_alta = ev["total_secundaria_alta_millones"]

asia = (
    sec_alta
    * ev["pct_asia_central_meridional_secundaria_alta"]
    / 100
)

africa = (
    sec_alta
    * ev["pct_africa_subsahariana_secundaria_alta"]
    / 100
)

total_regiones = asia + africa

print("\nDISTRIBUCIÓN REGIONAL DE SECUNDARIA ALTA")
print("Asia central y meridional:", round(asia, 1), "millones")
print("África subsahariana:", round(africa, 1), "millones")
print("Total de ambas regiones:", round(total_regiones, 1), "millones")

print(
    "Porcentaje conjunto:",
    round(
        ev["pct_asia_central_meridional_secundaria_alta"]
        + ev["pct_africa_subsahariana_secundaria_alta"],
        1
    ),
    "%"
)


# =====================================================
# GRÁFICA DE EVOLUCIÓN
# =====================================================

fig, ax = plt.subplots(figsize=(8, 4.5))

ax.plot(
    serie["anio"],
    serie["millones"],
    color=AZUL,
    linewidth=3,
    marker="o",
    markersize=10
)

for a, m in zip(serie["anio"], serie["millones"]):
    ax.text(
        a,
        m + 12,
        f"{int(m)} M",
        ha="center",
        fontweight="bold"
    )

ax.axhline(media_s, color=OSCURO, linestyle="--", linewidth=1)
ax.text(2000.3, media_s + 8, f"Media: {media_s:.1f} M", fontsize=10)

ax.set_xticks([2000, 2015, 2024])
ax.set_ylim(0, 450)
ax.set_title("Niños y jóvenes sin escolarizar, 2000-2024 (millones, aprox.)")
ax.set_ylabel("Millones")

limpiar(ax)
fig.tight_layout()
fig.savefig("grafica_evolucion_ods4.jpg", dpi=150)
plt.close(fig)

print("\nGráfica guardada: grafica_evolucion_ods4.jpg")
