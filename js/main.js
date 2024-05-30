async function deleting() {
    const title = document.getElementById('title');
    const phrase = title.textContent;

    // animation of deleting the title
    for (let i = phrase.length; i >= 0; i--) {
        title.textContent = phrase.slice(0, i);
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

async function typing(phrase) {
    const title = document.getElementById('title');
    // deleting the title
    await deleting();

    // animation of typing the title
    for (let i = 0; i < phrase.length; i++) {
        title.textContent = phrase.slice(0, i + 1);
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    await new Promise(resolve => setTimeout(resolve, 5000));
}

async function typePhrases() {
    const phrases = ['Desenvoledor Backend', 'Analista de Sistemas', 'Desenvolvedor Node.js', 'Gabriel Almir'];

    for (const phrase of phrases) {
        await typing(phrase);
    }
}

setTimeout(typePhrases, 5000);

document.getElementById('menu-btn').addEventListener('click', function () {
    var menu = document.getElementById('dropdown-menu');
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        menu.classList.add('block');
    } else {
        menu.classList.remove('block');
        menu.classList.add('hidden');
    }
});

document.addEventListener('click', function (event) {
    var menu = document.getElementById('dropdown-menu');
    if (!event.target.closest('#dropdown-menu') && !event.target.closest('#menu-btn')) {
        menu.classList.remove('block');
        menu.classList.add('hidden');
    }
});
