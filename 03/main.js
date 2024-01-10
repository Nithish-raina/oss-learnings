// TODO Implement or try Levenshtein Distance function to find misspelled words using similarity matching
/* 1. Construct a predefined set of words dataset
 * 2. Take user input string
 * 3. Compare the given input string with all the words in the dataset and find the similarity score
 * 4. Set a threshold and see if the similarity score exceeds it
 * 5. If it exceeds then return that word, else no match found
 */

// SQS Basic simulation
let messageQueue = [];
const sendMessage = (msg) => {
    messageQueue.push({ ...msg, visibility: true });
};
const receiveMessage = (consumerId) => {
    const fifoMsgIndex = messageQueue.findIndex((msg) => msg.visibility);
    if (fifoMsgIndex !== -1) {
        messageQueue[fifoMsgIndex].visibility = false;
        return messageQueue[fifoMsgIndex].message;
    }
    return null;
};
const pollMessage = (consumerId) => {
    setInterval(() => {
        const message = receiveMessage(consumerId);
        if (message) {
            return message;
        } else {
            return null;
        }
    }, 2000);
};
sendMessage({ id: 1, message: "Im first message", metaData: {} });
sendMessage({ id: 2, message: "Im second message", metaData: {} });
sendMessage({ id: 3, message: "Im third message", metaData: {} });

console.log(pollMessage(1));
console.log(pollMessage(2));
