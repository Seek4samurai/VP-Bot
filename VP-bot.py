import pyttsx3  #text-to-speech
import speech_recognition
import datetime

# setting speech
engine = pyttsx3.init('sapi5')
voices = engine.getProperty('voices')
print("Running: ", voices[1].id)
engine.setProperty('voice', voices[1].id)

def speak(audio):
    engine.say(audio)
    engine.runAndWait()

# greetings mortal function
def greetUser():
    hour = int(datetime.datetime.now().hour)
    if hour >= 0 and hour < 12:
        speak("Good Morning, user")
    elif hour >= 12 and hour < 18:
        speak("Good Afternoon, user")
    else:
        speak("Good Evening, user")
    # Introduction
    speak("Welcome. This is BOT, Version 16.12.21")

if __name__ == "__main__":
    greetUser()