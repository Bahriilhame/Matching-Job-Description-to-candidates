# scripts/extract_cv.py
import sys
import json
from PyPDF2 import PdfReader
import google.generativeai as genai

import os

API_KEY = os.environ['Gemini_Key']
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

def extract_text_from_pdf(pdf_path):
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text

def build_prompt(cv_text):
    prompt = f"""
extrait les données de ce cv en objet bien structuré :

nom 
contact : {{telephone, social, email, adresse}}
expérience : [{{poste, lieu, durée, entreprise, tâches}}]
formation : [{{type, spécialité, durée, établissement}}]
compétences : {{outils: [], technologies: [], autres: []}}
langues : [{{langue, niveau}}]
projets : [{{nom, description, technologies, outils}}]

- type doit être soit nom du diplôme soit certificat s'il existe

--- Début du CV ---
{cv_text}
--- Fin du CV ---
"""

if __name__ == "__main__":
    pdf_path = sys.argv[1]
    text = extract_text_from_pdf(pdf_path)
    prompt = build_prompt(text)
    response = model.generate_content(prompt)
    print(response.text)  # Node.js va le lire et le parser
