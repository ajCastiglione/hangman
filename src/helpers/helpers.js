export function showNotification(setter) {
    setter(true);
    setTimeout(() => {
        setter(false);
    }, 2000);
}

export function checkWin(correct, wrong, word) {
    let status = "win";

    // check for win
    word.split("").forEach((letter) => {
        if (!correct.includes(letter)) {
            status = "";
        }
    });

    // check for loss
    if (wrong.length === 6) {
        status = "lose";
    }

    return status;
}

export async function RandomWord() {
    const apiUrl =
        "https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";

    return fetch(apiUrl)
        .then((res) => res.json())
        .then((res) => {
            let formatted = res.map((word) => word.word);
            return formatted;
        })
        .catch(() => ["application", "programming", "interface", "wizard"]);
}
