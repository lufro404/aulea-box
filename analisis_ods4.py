"""Análisis de datos ODS 4 con Pandas.
Datos: UNESCO, niños y jóvenes sin escolarizar en 2024 (millones).
Fuente: World Education Blog (UNESCO), marzo de 2026.
"""
import pandas as pd
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

df = pd.read_csv("datos_ods4.csv")
print("TABLA COMPLETA")
print(df.to_string(index=False))

# 1) Filtrar: solo los tres niveles educativos
niveles = df[df["tipo"] == "nivel"]
sexos = df[df["tipo"] == "sexo"]

# 2) Media y máximo
media = niveles["millones"].mean()
maximo = niveles.loc[niveles["millones"].idxmax()]
total = niveles["millones"].sum()
print("\nMedia de los tres niveles:", round(media, 1), "millones")
print("Valor máximo:", maximo["grupo"], "con", maximo["millones"], "millones")
print("Total (suma de niveles):", total, "millones")

# 3) Ordenar de menor a mayor
orden = niveles.sort_values("millones")
print("\nORDENADO DE MENOR A MAYOR")
print(orden[["grupo", "millones"]].to_string(index=False))

# 4) Porcentaje de cada nivel sobre el total
niveles = niveles.assign(porcentaje=(niveles["millones"] / total * 100).round(1))
print("\nPORCENTAJE SOBRE EL TOTAL")
print(niveles[["grupo", "porcentaje"]].to_string(index=False))

# 5) Filtro: niveles por encima de la media
print("\nNiveles por encima de la media:", list(niveles[niveles["millones"] > media]["grupo"]))
print("Chicos menos chicas:", int(sexos.set_index("grupo").loc["Chicos", "millones"] - sexos.set_index("grupo").loc["Chicas", "millones"]), "millones")

# 6) Gráfica (ordenada de menor a mayor)
fig, ax = plt.subplots(figsize=(8, 4.5))
colores = ["#2f8fd8", "#2f8fd8", "#f2b01e"]
barras = ax.bar(orden["grupo"], orden["millones"], color=colores)
ax.axhline(media, color="#10202f", linestyle="--", linewidth=1)
ax.text(-0.4, media + 3, f"Media: {media:.0f} M", fontsize=10)
for b in barras:
    ax.text(b.get_x() + b.get_width() / 2, b.get_height() + 2, f"{int(b.get_height())} M", ha="center", fontweight="bold")
ax.set_title("Niños y jóvenes sin escolarizar en 2024, por nivel (millones)")
ax.set_ylabel("Millones")
ax.set_ylim(0, 150)
for lado in ("top", "right"):
    ax.spines[lado].set_visible(False)
fig.tight_layout()
fig.savefig("grafica_ods4.png", dpi=150)
print("\nGráfica guardada: grafica_ods4.png")
