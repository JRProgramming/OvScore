class iModel {
    //Creates an object with all of the responses that are about to come
    constructor() {
        this.responses = {};
        this.a = {};
        this.error = 'There were either not enough entries to formulate a recommendation or one of the entries was invalid. Please try again.';
    }
    validateResponses(responses) {
        //validates the responses by aligning the user's response to the available responses and making sure they are all strings
        const options = {
            FIGO: ['I', 'II', 'III', 'IV'], 
            RD: ['0', '>0'],  
            PFI: ['<16', '≥16'], 
            ECOG: ['0-1', '2-3'],
            CA125: ['>105', '≤105'],
            ASCITES: ['Present', 'Absent']
        };
        const notEmptyEntries = Object.entries(responses).length !== 0;
        const validatedEntries = Object.values(responses).every((response, index) => !response || (typeof response === 'string' && Object.values(options)[index].includes(response)));
        //makes sure that the entries are in the correct format and the responses are not empty
        //if the responses are empty, then validatedEntries return true
        return notEmptyEntries && validatedEntries;
    }
    calculateScore(responses) {
        let score = 0;
        const response = responses;
        const categoryScores = [
            {response: response['FIGO'], options: ['III','IV'], score: 0.8},
            {response: response['RD'], options: ['>0'], score: 1.5},
            {response: response['PFI'], options: ['<16'], score: 2.4},
            {response: response['ECOG'], options: ['2-3'], score: 2.4},
            {response: response['CA125'], options: ['>105'], score: 1.8},
            {response: response['ASCITES'], options: ['Present'], score: 3}
        ];
        //Goes through each category and adds the score if the conditions match
        categoryScores.forEach(category => {
            if(category['options'].includes(category['response'])) score += category['score'];
        });
        score = score.toFixed(1);
        //The score gets calculated based on the responses given
        //If all of the responses are given, then a recommendation will also be given
        return score;
    }
    formulateRecommendation(score, responsesLength) {
        //formulates a recommendation based on inputs
        if(responsesLength === 6) {
            return score <= 4.7 ? `Recommendation: Surgery` : `Recommendation: No surgery`;
        }
        return null;
    }
}
module.exports = new iModel();