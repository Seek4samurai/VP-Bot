import pyttsx3  #text-to-speech
import speech_recognition
import datetime
import wikipedia

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
        speak("Good Morning, how may i help you")
    elif hour >= 12 and hour < 18:
        speak("Good Afternoon, how may i help you")
    else:
        speak("Good Evening, how may i help you")

def about():
    # Introduction
    speak("I am a BOT designed in python, Version 16.12.21, Please let me know how may i help you")

# mic input from user
def takeCommand():
    micInput = speech_recognition.Recognizer()
    with speech_recognition.Microphone() as source:
        print("LISTENING NOW!")
        micInput.pause_threshold = 1 # may vary for some users!!!
        audio = micInput.listen(source)

    try:
        print("Recognizing Now.")
        query = micInput.recognize_google(audio, language='en-in')
        print(f"Mic Input: {query}\n")

    except Exception as e:
        # print("Error while Mic Input")
        print("Sorry could not hear that, please repeat.")
        return 'None'

    return query

if __name__ == "__main__":
    greetUser()
    # takeCommand()
    while True:
        query = takeCommand().lower()

        # Queries here
        if 'wikipedia' in query:
            speak('Searching...')
            query = query.replace("wikipedia","")
            results = wikipedia.summary(query, sentences=1)
            speak("According to Wikipedia")
            print(results)
            speak(results)

        if 'who are you' or 'tell me something about yourself' or 'who is VP' in query:
            about()

        # Browser commands
        # elif 'open google' or 'search google' in query:
        #     webbrowser.open("google.com")
        #
        # elif 'open youtube' or 'search youtube' in query:
        #     webbrowser.open("youtube.com")
