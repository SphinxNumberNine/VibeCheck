const fs = require('fs');
const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient({
    projectId: 'vibe-check-language-256505',
    keyFilename: __dirname+'/key.json'
});
const tips = JSON.parse(fs.readFileSync(__dirname+'/tips.json'));

function getIndex(keywords) {
    let index = -1;
    for (i in tips) {
        for (j in keywords) {
            for (n in tips[i].synonyms) {
                if (tips[i].synonyms[n].includes(keywords[j].toLowerCase())) {
                    index = i;
                    break;
                }
            }
        }
        if (index != -1) {
            break;
        }
    }
    return index;
}

async function getTip(text) {
    let document = {
        content: text,
        type: 'PLAIN_TEXT',
    };

    let [result] = await client.analyzeEntities({ document });

    let entities = result.entities;
    let keywords = [];
    let index = -1;

    entities.forEach(entity => {
        keywords.push(entity.name);
    });

    index = getIndex(keywords)

    if (index == -1) {
        let [syntax] = await client.analyzeSyntax({ document });
        keywords = [];
        syntax.tokens.forEach(part => {
            if (part.text.content != part.lemma && part.text.content.includes(part.lemma) && part.lemma.length >= 3) {
                keywords.push(part.lemma);
            }
        });

        index = getIndex(keywords)

        if (index == -1) {
            keywords = [];
            syntax.tokens.forEach(part => {
                if (part.partOfSpeech.tag == 'VERB') {
                    keywords.push(part.text.content);
                }
            });

            index = getIndex(keywords);
        }
    }

    if (index != -1) {
        return {
            'tip': tips[index].content,
            'title': tips[index].title
        }
    }

    return null;
}

module.exports = getTip;