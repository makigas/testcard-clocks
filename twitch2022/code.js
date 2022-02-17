const sentences = [
    ['delay', 4000],
    ['print', "<https://twitch.tv/danirod_>"],
    ['delay', 4000],
    ['linebreak'],
    ['print', 'Iniciando sistema operativo...'],
    ['delay', 7000],
    ['linebreak'],
    ['print', 'Montando el disco duro de los memes...'],
    ['delay', 6000],
    ['linebreak'],
    ['print', 'Sacando brillo a los teclados...'],
    ['delay', 7000],
    ['linebreak'],
    ['print', 'Desfragmentando un kiwi...'],
    ['delay', 6000],
    ['linebreak'],
    ['print', 'Ejecutando entorno gráfico...'],
    ['delay', 4000],
    ['linebreak'],
    ['print', 'Música cortesía de: Kevin MacLeod'],
    ['print', 'Jet Fuelen Vixen (CC BY)'],
];

let speed = 30;

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

function printChars(element, string) {
    const action = new Promise((resolve) => {
        delay(speed).then(() => {
            if (string[0] == ' ') {
                element.innerHTML += string[0];
            } else {
                element.innerText += string[0];
            }
            resolve();
        });
    });
    if (string.length > 1) {
        return action.then(() => printChars(element, string.slice(1)));
    }
}

function printString() {
    function printNextSentence() {
        if (sentences.length == 0) {
            return;
        }
        const next = sentences.shift(1);
        console.log(next)
        switch (next[0]) {
            case 'delay': {
                const amount = next[1];
                return delay(amount).then(() => { printNextSentence() });
            }
            case 'linebreak': {
                const paragraph = document.createElement("p");
                paragraph.classList.add('invisible');
                paragraph.innerText = '.';
                document.body.querySelector('#logwrap').appendChild(paragraph);
                // Limit the number of lines presented in the screen.
                if (document.body.querySelector('#logwrap').children.length > 20) {
                    document.body.querySelector('#logwrap').firstChild.remove();
                }
                window.scrollTo(0,document.body.scrollHeight);
                return printNextSentence();
            }
            case 'setspeed': {
                speed = next[1];
                return printNextSentence();
            }
            case 'print': {
                document.querySelector('#logwrap').classList.remove('empty');
                const paragraph = document.createElement("p");
                document.body.querySelector('#logwrap').appendChild(paragraph);
                // Limit the number of lines presented in the screen.
                if (document.body.querySelector('#logwrap').children.length > 20) {
                    document.body.querySelector('#logwrap').firstChild.remove();
                }
                const text = next[1];
                return printChars(paragraph, text).then(() => { printNextSentence() });
            }
        }
    }

    printNextSentence();
}

function inject(id) {
    const content = document.getElementById(id).content;
    document.body.appendChild(document.importNode(content, true));
}

inject('boot');
const oldAudio = new Audio("startup.mp3");
oldAudio.volume = 0.7;
oldAudio.play();

const BIOS_DURATION = 16000;
const BOOT_WAIT = 17000;
const BOOT_DURATION = 65000;

setTimeout(function() {
    document.querySelector('.boot').remove();
    inject('log');
}, BIOS_DURATION);

setTimeout(function() {
    const oldAudioFadeout = setInterval(() => {
        if (oldAudio.volume < 0.01) {
            oldAudio.pause();
            clearInterval(oldAudioFadeout);
        } else {
            oldAudio.volume -= 0.01;
        }
    }, 1000 / 50);
    setTimeout(() => {
        const newAudio = new Audio("Jet Fueled Vixen.mp3");
        newAudio.volume = 0.3;
        newAudio.play();
    }, 1500);

    setTimeout(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        setTimeout(() => {
            inject('desktop');
        }, 1000);
        setTimeout(() => {
            document.querySelector('#menubar.hidden').classList.remove('hidden');
            setTimeout(() => {
                document.querySelector('#popup.hidden').classList.remove('hidden');
            }, 2000);
        }, 2000);
    }, BOOT_DURATION);

    printString();
}, BOOT_WAIT);
