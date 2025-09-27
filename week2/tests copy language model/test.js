let language
do {
    language = prompt("Choose your language: en, fr or de"); 

}while (language !== "en" && language !== "fr" && language !== "de");
if (language == "en") {
    alert ("Hello World");

} else if (language == "fr") {
    alert ("Bonjour le monde");

} else if (language == "de") {
    alert ("Hallo Welt");
}

