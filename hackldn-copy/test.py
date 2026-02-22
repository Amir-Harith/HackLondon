import google.genai as genai
import json
import os
import tempfile
from datetime import datetime
import requests  # For Eleven Labs TTS
import platform
import subprocess
import speech_recognition as sr  # For voice-to-text

# ------------------ CONFIG ------------------
API_KEY_GEM = "AIzaSyDYTK_T8p4HgjWZelbf9OtuFjD61GSEli4"
ELEVEN_LABS_API_KEY = "100034f67669b8222bb54687af49c96a2bb13dc47564efe942ef854798741703"  
ELEVEN_LABS_VOICE = "EXAVITQu4vr4xnSDxMaL"  # replace with your preferred voice ID
client = genai.Client(api_key=API_KEY_GEM)

SYSTEM_PROMPT = (
    "Act as an interactive reflective journal. "
    "Respond in 1–3 sentences. "
    "Always ask a gentle follow-up question."
)

JSON_FILE = "journal.json"
TXT_FILE = "journal.txt"

# ------------------ LOAD DATA ------------------
if os.path.exists(JSON_FILE):
    with open(JSON_FILE, "r", encoding="utf-8") as f:
        loaded = json.load(f)
        if isinstance(loaded, list):
            data = {"history": loaded, "moods": []}
        else:
            data = loaded
else:
    data = {"history": [{"role": "user", "parts": [{"text": SYSTEM_PROMPT}]}], "moods": []}

history = data["history"]

# ------------------ HELPERS ------------------
def save_all():
    data["history"] = history
    with open(JSON_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def append_txt(role, text):
    time = datetime.now().strftime("%Y-%m-%d %H:%M")
    with open(TXT_FILE, "a", encoding="utf-8") as f:
        f.write(f"[{time}] {role}: {text}\n")

def add_mood(word):
    entry = {"time": datetime.now().strftime("%Y-%m-%d %H:%M"), "emotion": word.lower()}
    data["moods"].append(entry)
    save_all()
    print(f"(saved mood: {word})\n")

def speak_text(text):
    """
    Convert text to speech using Eleven Labs and play it.
    """
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{ELEVEN_LABS_VOICE}"
    headers = {"xi-api-key": ELEVEN_LABS_API_KEY, "Content-Type": "application/json"}
    payload = {"text": text, "voice": ELEVEN_LABS_VOICE, "format": "mp3"}

    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        audio_file = os.path.join(tempfile.gettempdir(), "tts_output.mp3")
        with open(audio_file, "wb") as f:
            f.write(response.content)
        with open(audio_file, "wb") as f:
            f.write(response.content)

        # Play audio cross-platform
        system = platform.system()
        if system == "Windows":
            os.startfile(audio_file)
        elif system == "Darwin":  # macOS
            subprocess.call(["afplay", audio_file])
        else:  # Linux
            subprocess.call(["mpg123", audio_file])
    except Exception as e:
        print(f"(TTS error: {e})")

def listen_to_voice():
    """
    Listen to microphone and convert speech to text.
    Returns the recognized text or None if failed.
    """
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("🎤 Listening... (speak now)")
        try:
            recognizer.adjust_for_ambient_noise(source, duration=0.5)
            audio = recognizer.listen(source, timeout=5, phrase_time_limit=10)
            print("Processing...")
            text = recognizer.recognize_google(audio)
            return text
        except sr.WaitTimeoutError:
            print("(No speech detected)")
            return None
        except sr.UnknownValueError:
            print("(Could not understand audio)")
            return None
        except sr.RequestError as e:
            print(f"(Speech recognition error: {e})")
            return None
        except Exception as e:
            print(f"(Microphone error: {e})")
            return None

# ------------------ INTERACTIVE LOOP ------------------
print("Interactive Journal")
print("Commands:")
print("  /mood happy")
print("  /voice - Use voice input")
print("  quit\n")

while True:
    user_input = input("You: ").strip()

    if user_input.lower() == "quit":
        save_all()
        print("Conversation saved.")
        break

    # -------- VOICE COMMAND --------
    if user_input.lower() == "/voice":
        voice_text = listen_to_voice()
        if voice_text:
            print(f"You (voice): {voice_text}\n")
            user_input = voice_text
        else:
            continue

    # -------- MOOD COMMAND --------
    if user_input.startswith("/mood "):
        mood_word = user_input[6:].strip()
        if " " in mood_word or mood_word == "":
            print("Please enter a single word emotion.\n")
        else:
            add_mood(mood_word)
        continue

    # -------- NORMAL CHAT --------
    history.append({"role": "user", "parts": [{"text": user_input}]})
    append_txt("You", user_input)

    print("Journal: ", end="", flush=True)

    response = client.models.generate_content_stream(
        model="gemini-2.5-flash",
        contents=history
    )

    assistant_text = ""
    for chunk in response:
        if chunk.text:
            print(chunk.text, end="", flush=True)
            assistant_text += chunk.text

    print("\n")

    history.append({"role": "model", "parts": [{"text": assistant_text}]})
    append_txt("Journal", assistant_text)
    save_all()

    # -------- SPEAK RESPONSE --------
    speak_text(assistant_text)