import os
import google.generativeai as genai
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PyPDF2 import PdfReader
import uvicorn
import json

# ====== Configuration de l'API Gemini ======
API_KEY = "AIzaSyAa_qSeIDU7f2m9TkBTUomvjr691ce04rs"  # Replace with your actual Gemini API key
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")

# ====== FastAPI app ======
app = FastAPI()

# (Optionnel) Activer CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def extract_text_from_pdf(file_bytes) -> str:
    text = ""
    try:
        # Create a BytesIO object to make the bytes seekable
        from io import BytesIO
        pdf_file = BytesIO(file_bytes)
        
        reader = PdfReader(pdf_file)
        for page in reader.pages:
            text += page.extract_text()
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return ""
    return text


# ====== Prompt Generator ======
def build_prompt(cv_text: str) -> str:
    return f"""
extrait les données de ce cv en objet JSON bien structuré :

{{
  "nom": "Nom complet",
  "contact": {{
    "telephone": "Numéro de téléphone",
    "email": "Adresse e-mail",
    "adresse": "Adresse postale",
    "social": ["Liens vers les profils sociaux (LinkedIn, etc.)"]
  }},
  "expérience": [
    {{
      "poste": "Intitulé du poste",
      "lieu": "Lieu (ville, pays)",
      "durée": "Période (ex: 2020-2022)",
      "entreprise": "Nom de l'entreprise",
      "tâches": ["Liste des principales responsabilités et réalisations"]
    }}
  ],
  "formation": [
    {{
      "type": "Type de diplôme/certificat",
      "spécialité": "Domaine d'études/spécialisation",
      "durée": "Période (ex: 2018-2020)",
      "établissement": "Nom de l'établissement"
    }}
  ],
  "compétences": {{
    "outils": ["Liste des outils maîtrisés"],
    "technologies": ["Liste des technologies maîtrisées"],
    "autres": ["Autres compétences pertinentes"]
  }},
  "langues": [
    {{
      "langue": "Nom de la langue",
      "niveau": "Niveau de maîtrise (ex: Courant, Intermédiaire, Débutant)"
    }}
  ],
  "projets": [
    {{
      "nom": "Nom du projet",
      "description": "Brève description du projet",
      "technologies": ["Technologies utilisées"],
      "outils": ["Outils utilisés"],
      "lien": "Lien vers le projet (si applicable)"
    }}
  ]
}}

- "type" dans "formation" doit être soit le nom du diplôme soit "Certificat" s'il existe.
- Veuillez retourner un objet JSON **strictement** selon cette structure. Si certaines informations ne sont pas présentes, la valeur correspondante doit être null ou une liste vide selon le cas.

--- Début du CV ---
{cv_text}
--- Fin du CV ---
"""


@app.post("/extract-cv/")
async def extract_cv(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        cv_text = extract_text_from_pdf(contents)
        
        if not cv_text:
            return {"status": "success", "data": {}}

        prompt = build_prompt(cv_text)
        response = model.generate_content(prompt)
        extracted_data_str = response.text.strip()

        # Handle both wrapped and direct JSON responses
        if extracted_data_str.startswith('```json'):
            json_str = extracted_data_str[7:-3].strip()
            extracted_data = json.loads(json_str)
        else:
            extracted_data = json.loads(extracted_data_str)

        return {
            "status": "success",
            "data": extracted_data
        }

    except Exception as e:
        print(f"Error processing file: {e}")
        return {
            "status": "error",
            "message": str(e),
            "data": {}
        }