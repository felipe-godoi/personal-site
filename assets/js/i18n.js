// List of available locales
const availableLocales = ['en', 'pt'];

// Default locale.
const defaultLanguage = 'pt';

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
            "TEXT": "Software Developer with 4+ years of experience working primarily with Angular and Node.js technologies. Extensive experience with relational databases. Enthusiastic about artificial intelligence technologies. B.Sc. in Computer Engineering (IFTM) and pursuing a Postgraduate Degree in Distributed Software Architecture (PUC Minas) and a Postgraduate Degree in Blockchain Development (UniFECAF).",
            "ABOUT_ME": "About me"
        },
        "SKILLS": {
            "TITLE": "Technologies",
            "SECOND_TITLE": "Skills",
            "TEXT": {
                "1": "Here are the main technologies I master. Besides these, I've had contact with several others that I haven't listed here because I don't consider myself proficient in them, but I'm always studying and willing to learn new technologies.",
                "2": "Among the described technologies, I have more experience working with Angular, NodeJS, and Typescript. Alongside these technologies, I also use various databases, but I highlighted MySQL as the one I have the most experience with.",
                "3": "Furthermore, I am specializing in Blockchain technologies and Distributed Software Architecture."
            }
        },
        "CONTACT": {
            "CURRICULUM": "Download Resume",
            "TALK": "Talk to me"
        }
    },
    pt: {
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
            "TEXT": "Desenvolvedor de Software com mais de 4 anos de experiência trabalhando principalmente com as tecnologias Angular e Node.js. Extensa experiência com bancos de dados relacionais. Entusiasta das tecnologias de inteligência artificial. Bacharel em Engenharia de Computação (IFTM) e cursando Pós-Graduação em Arquitetura de Software Distribuído (PUC Minas) e Pós-Graduação em Desenvolvimento de Blockchain (UniFECAF).",
            "ABOUT_ME": "Sobre mim"
        },
        "SKILLS": {
            "TITLE": "Habilidades",
            "SECOND_TITLE": "Tecnologias",
            "TEXT": {
                "1": "Aqui estão descritas  as principais tecnologias que domino. Além delas, já tive contato com várias outras que não coloquei aqui pois não considerar que as domino, mas estou sempre estudando e disposto a aprender novas tecnologias.",
                "2": "Dentre as tecnologias descritas, possuo mais tempo trabalhando com Angular, NodeJS e Typescript. Juntamente com essas tecnologias também utilizo bancos de dados diversos, mas destaquei o MySQL por ser o que mais possuo experiência.",
                "3": "Além disso, estou me especializando em tecnologias Blockchain e também em Arquitetura de Software Distribuido." 
            }
        },
        "CONTACT": {
            "CURRICULUM": "Baixar currículo",
            "TALK": "Fale comigo"
        }
    },
};

function translate() {
    // Manually detect users' language, strip languages such as `en-GB` to just `en`.
    let language = (window.navigator.userLanguage || window.navigator.language).substr(0, 2);

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

