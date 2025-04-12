
const serviceMessage = require('../constants/messages/service.messages');
const OpenAI = require('openai');

const urduRegex = /^[\u0600-\u06FF\s،۔]+$/; // Improved Urdu regex to handle spaces and punctuation

module.exports = {
    isUrdu(text) {
        return urduRegex.test(text); // Validate text only contains Urdu characters
    },

    difficultyCheck(difficulty) {
        const lowerCaseDifficulty = difficulty.toLowerCase();
        let difficultyMessage;

        switch (lowerCaseDifficulty) {
            case 'easy':
                difficultyMessage = serviceMessage.easy;
                break;
            case 'moderate':
                difficultyMessage = serviceMessage.moderate;
                break;
            case 'difficult':
                difficultyMessage = serviceMessage.difficult;
                break;
            default:
                difficultyMessage = serviceMessage.easy;
                break;
        }

        return `${serviceMessage.baseMessage} ${difficultyMessage}`;
    },
    async gptPrompt(systemMessage, userMessage, requestType, targetLang = 'english') {
        try {
          const openai = new OpenAI({ apiKey: process.env.API_KEY });
      
          let content;
          if (requestType === 'summarize') {
            content = `براہ کرم درج ذیل اردو متن کا خلاصہ کریں: ${userMessage}`;
          } else if (requestType === 'translate') {
            const languageMap = {
              english: 'English',
              arabic: 'Arabic',
              sindhi: 'Sindhi',
              pashto: 'Pashto',
              punjabi: 'Punjabi',
              turkish: 'Turkish'
            };
      
            const targetLangFormatted = languageMap[targetLang.toLowerCase()] || 'English';
            content = userMessage;

            // content = `براہ کرم درج ذیل اردو متن کا ${targetLangFormatted} میں ترجمہ کریں: ${userMessage}`;
          } else {
            throw new Error('Invalid request type');
          }
      
          const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
              { role: 'system', content: systemMessage },
              { role: 'user', content: content },
            ],
          });
      
          let result = response.choices[0].message.content.trim();
      
          if (requestType === 'summarize') {
            if (!urduRegex.test(result)) {
              throw new Error(serviceMessage.unableToGetAnswer);
            }
            if (result.startsWith(serviceMessage.startWithThis)) {
              result = result.replace(serviceMessage.replaceWithThis, "").trim();
            }
          }
      
          return { status: true, data: result };
        } catch (error) {
          console.error("OpenAI Error:", error.message);
          return { status: false, message: serviceMessage.unableToGetAnswer };
        }
      }
      
    // async gptPrompt(systemMessage, userMessage, requestType) {
    //     try {
    //         const openai = new OpenAI({ apiKey: process.env.API_KEY });

    //         let content;
    //         if (requestType === 'summarize') {
    //             content = `براہ کرم درج ذیل اردو متن کا خلاصہ کریں: ${userMessage}`;
    //         } else if (requestType === 'translate') {
    //             content = `براہ کرم درج ذیل اردو متن کا انگریزی میں ترجمہ کریں: ${userMessage}`;
    //         } else {
    //             throw new Error('Invalid request type');
    //         }

    //         const response = await openai.chat.completions.create({
    //             model: 'gpt-4',
    //             messages: [
    //                 { role: 'system', content: systemMessage },
    //                 { role: 'user', content: content },
    //             ],
    //         });

    //         let result = response.choices[0].message.content.trim();
    //         if(requestType === 'summarize'){
    //         if (!urduRegex.test(result)) {
    //             throw new Error(serviceMessage.unableToGetAnswer); // Ensure result contains Urdu content
    //         }

    //         if (result.startsWith(serviceMessage.startWithThis)) {
    //             result = result.replace(serviceMessage.replaceWithThis, "").trim();
    //         }
    //       } 
    //       else if (requestType === 'translate') {
    //         result = result.replace(/^Please translate the following Urdu text into English:/i, '').trim();
    //     }
        
    //         return { status: true, data: result };
    //     } catch (error) {
    //         console.error("OpenAI Error:", error.message);
    //         return { status: false, message: serviceMessage.unableToGetAnswer };
    //     }
    // },
};



