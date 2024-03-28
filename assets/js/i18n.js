// List of available locales
const availableLocales = ['en', 'pt-br'];

// Default locale.
const defaultLanguage = 'pt-br';

// Locale translations.
const locales = {
    en: {
        "HOME": {
            "TITLE": "Hey! I'm Felipe Godoi, Software Developer and technology lover.",
            "TECH": {
                "WEB": "Web Fullstack",
                "MOBILE": "Mobile",
                "BLOCKCHAIN": "Blockchain"
            },
            "MORE": "Learn more",
            "TALK": "Let's talk"
        },
        "NAV": {
            "HOME": "Home",
            "ABOUT": "About",
            "SKILLS": "Skills",
            "PROJECTS": "Projects",
            "CONTACT": "Contact"
        },
        "BIO": {
            "TITLE": "Biography",
            "TEXT": "Software Developer with 4+ years of experience working primarily with Angular and Node.js technologies. Extensive experience with relational databases. Enthusiastic about artificial intelligence technologies. B.Sc. in Computer Engineering and pursuing a Postgraduate Degree in Distributed Software Architecture (PUC Minas) and a Postgraduate Degree in Blockchain Development (UniFECAF).",
            "ABOUT_ME": "About me"
        }
    },
    "pt-br": {
        "HOME": {
            "TITLE": "Olá! Sou o Felipe Godoi, Desenvolvedor de Software e amante de tecnologia.",
            "TECH": {
                "WEB": "Web Fullstack",
                "MOBILE": "Mobile",
                "BLOCKCHAIN": "Blockchain"
            },
            "MORE": "Saiba mais",
            "TALK": "Vamos conversar"
        },
        "NAV": {
            "HOME": "Início",
            "ABOUT": "Sobre",
            "SKILLS": "Habilidades",
            "PROJECTS": "Projetos",
            "CONTACT": "Contato"
        },
        "BIO": {
            "TITLE": "Biografia",
            "TEXT": "Desenvolvedor de Software com mais de 4 anos de experiência trabalhando principalmente com as tecnologias Angular e Node.js. Extensa experiência com bancos de dados relacionais. Entusiasta das tecnologias de inteligência artificial. Bacharel em Engenharia de Computação e cursando Pós-Graduação em Arquitetura de Software Distribuído (PUC Minas) e Pós-Graduação em Desenvolvimento de Blockchain (UniFECAF).",
            "ABOUT_ME": "Sobre mim"
        }
    },
};

function translate() {
    // Manually detect users' language, strip languages such as `en-GB` to just `en`.
    let language = (window.navigator.userLanguage || window.navigator.language);

    // If `?lang=` exists in URL params & is valid, then use that instead.
    const urlParams = new URLSearchParams(window.location.search);
    const langFromUrl = urlParams.get('lang');
    if (langFromUrl && availableLocales.includes(langFromUrl)) {
        language = langFromUrl
    }

    // Set `pageLanguage` only if its available within our locales, otherwise default.
    let pageLanguage = defaultLanguage;
    if (availableLocales.includes(language)) {
        pageLanguage = language;
    }

    // Get all page elements to be translated.
    const elements = document.querySelectorAll('[data-i18n]');

    // Get JSON object of translations.
    const json = locales[pageLanguage];

    // On each element, found the translation from JSON file & update.
    elements.forEach((element, index) => {
        const key = element.getAttribute('data-i18n');
        let text = key.split('.').reduce((obj, i) => (obj ? obj[i] : null), json);

        // Does this text have any variables? (eg {something})
        const variables = text.match(/{(.*?)}/g);
        if (variables) {

            // Iterate each variable in the text.
            variables.forEach((variable) => {

                // Filter all `data-*` attributes for this element to find the matching key.
                Object.entries(element.dataset).filter(([key, value]) => {
                    if (`{${key}}` === variable) {
                        try {
                            // Attempt to run actual JavaScript code.
                            text = text.replace(`${variable}`, new Function(`return (${value})`)());
                        } catch (error) {
                            // Probably just static text replacement.
                            text = text.replace(`${variable}`, value);
                        }
                    }
                })
            });
        }

        // Regular text replacement for given locale.
        element.innerHTML = text;
    });

    // Set <html> tag lang attribute.
    const htmlElement = document.querySelector('html');
    htmlElement.setAttribute('lang', pageLanguage);
}

translate();

