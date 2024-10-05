const fs = require('fs');

// Specify the path to your db.json file
const dbFilePath = 'db.json';

// Read the db.json file
fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    try {
        // Parse the JSON data
        const jsonData = JSON.parse(data);

        // Check if articles exists
        if (!jsonData.articles || !Array.isArray(jsonData.articles)) {
            console.error('No articles found or articles is not an array.');
            return;
        }

        // Loop through the articles and update subtitles
        jsonData.articles = jsonData.articles.map((article) => {
            // Check if subtitle is a string
            if (typeof article.subtitle === 'string') {
                if (article.subtitle.startsWith('Джерело:')) {
                    // If it starts with 'Джерело:', split it into text and link
                    const [text, link] = article.subtitle.split(': ');
                    return {
                        ...article,
                        subtitle: {
                            text: `${text}:`,
                            link: link || '', // Set link to an empty string if it doesn't exist
                        },
                    };
                }
                // If it does not start with 'Джерело:', convert to the new format
                return {
                    ...article,
                    subtitle: {
                        text: article.subtitle, // Use the existing subtitle as the text
                    },
                };
            }
            // Return article unchanged if subtitle is not a string
            return article;
        });

        // Write the updated data back to the db.json file
        fs.writeFile(
            dbFilePath,
            JSON.stringify(jsonData, null, 2),
            'utf8',
            (err) => {
                if (err) {
                    console.error('Error writing to the file:', err);
                } else {
                    console.log('File updated successfully!');
                }
            },
        );
    } catch (parseErr) {
        console.error('Error parsing JSON data:', parseErr);
    }
});
