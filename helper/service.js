const serviceMessage = require('../constants/messages/service.messages')


module.exports = {
    isUrdu(text) {
        const urduRegex = /[\u0600-\u06FF]/; 
        return urduRegex.test(text);
    },

    /**
     * 
     * @param {String} difficulty [easy moderate difficult] only available
     * @returns 
     */
    difficultyCheck(difficulty) {
      // Convert difficulty to lowercase to make it case-insensitive
      const lowerCaseDifficulty = difficulty.toLowerCase();
      
      let difficultyMessage;
      
      // Determine message based on difficulty level
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
              // Fallback to moderate if an invalid difficulty is provided
              difficultyMessage = serviceMessage.easy;
              break;
      }

      return `${serviceMessage.baseMessage} ${difficultyMessage}`;
    },

    /**
     * 
     */
    async gptPromte (systemMessage, userMessage ) {
        try {
            const OpenAI = require('openai');
            const openai = new OpenAI({
                apiKey: process.env.API_KEY
              });
            const response = await openai.chat.completions.create({
                model: 'gpt-4',
                messages: [
                  {
                    role: 'system',
                    content: systemMessage,
                  },
                  {
                    role: 'user',
                    content:` براہ کرم درج ذیل اردو متن کا خلاصہ کریں: ${userMessage}`,
                  },
                ],
              });

          
              let summary = response.choices[0].message.content.trim();
          
              // Ensure only Urdu characters are included in the summary
              summary = summary.replace(/[^\u0600-\u06FF\s،۔]/g, '').trim();
          
              // Optional: remove common starting phrase
              if (summary.startsWith(serviceMessage.startWithThis)) {
                summary = summary.replace(serviceMessage.replaceWithThis, "").trim();
              }

              return {status: true, data:summary}
        } catch (error) {
            console.log('error :>> ', error);
            return {status: true, message:serviceMessage.unableToGetAnswer}

        }
    }
};



// async function summarizeInUrdu(text, difficulty) {
//     try {
  
//       const response = await openai.chat.completions.create({
//         model: 'gpt-4',
//         messages: [
//           {
//             role: 'system',
//             content: systemMessage,
//           },
//           {
//             role: 'user',
//             content: براہ کرم درج ذیل اردو متن کا خلاصہ کریں: "${text}",
//           },
//         ],
//       });
  
//       let summary = response.choices[0].message.content.trim();
  
//       // Ensure only Urdu characters are included in the summary
//       summary = summary.replace(/[^\u0600-\u06FF\s،۔]/g, '').trim();
  
//       // Optional: remove common starting phrase
//       if (summary.startsWith("متن کا خلاصہ یہ ہے کہ")) {
//         summary = summary.replace("متن کا خلاصہ یہ ہے کہ", "").trim();
//       }
  
//       return summary;
//     } catch (error) {
//       console.error('Error summarizing text:', error);
//       return 'خلاصہ کرنے میں خرابی آئی ہے۔';
//     }
//   }
  
//   app.post('/summarize', async (req, res) => {
//     const { text, difficulty } = req.body;
  
//     // Check if the input is in Urdu script
//     if (isUrdu(text)) {
//       const summary = await summarizeInUrdu(text, difficulty);
//       return res.json({ summary });
//     }
//     res.status(400).send('خطا: براہ کرم اردو میں تحریر فراہم کریں۔');
//   });
  
  