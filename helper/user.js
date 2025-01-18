
const serviceMessage = require('../constants/messages/service.messages');
const OpenAI = require('openai');
const db = require('../models');

const urduRegex = /^[\u0600-\u06FF\s،۔]+$/; // Improved Urdu regex to handle spaces and punctuation

module.exports = {
    /**
     * Save history of user in the database.
     * @param {string} user_id - User ID
     * @param {number} service_id - Service ID
     * @returns {object} Result of the operation
     */
    saveHistory: async (user_id, service_id) => {
        try { 
            // Validate input
            if (!user_id || !service_id) {
                return { status: false, message: 'User ID and Service ID are required' };
            }

            const history = db['UserHistories']; // Assuming this is your model
            const data = {
                user_id,
                page_visited :  service_id
            };

            // Await for history creation
            const history_saved = await history.create(data);

            console.log('history_saved :>> ', history_saved);
            return { status: true, history: history_saved };
            
        } catch (error) {
            console.error('Error saving history:', error);
            return { status: false, message: error.message };
        }
    },

    /**
     * check if the text is in Urdu
     * @param {Request} text
     * @param {String} type 
     * @returns {String}
     */
    getUserIdOrEmailFromToken(req, type=''){ 
        try {
            if(type == 'email') return req.user.email;
            else return req.user.userId;
        } catch (error) {
            console.log('error :>> ', error);   
        }
    }
};

