const AWS = require('aws-sdk');

// Configure AWS SDK with your credentials and region
AWS.config.update({
    accessKeyId: 'YOUR_ACCESS_KEY_ID',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
    region: 'YOUR_AWS_REGION',
});

// Create an SQS service object
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

// Specify the URL of your SQS queue
const queueUrl = 'YOUR_SQS_QUEUE_URL';

// Function to receive messages from the SQS queue
async function receiveMessages() {
    const params = {
        AttributeNames: ['All'],
        MaxNumberOfMessages: 10, // Adjust based on your requirements
        MessageAttributeNames: ['All'],
        QueueUrl: queueUrl,
        VisibilityTimeout: 0,
        WaitTimeSeconds: 0, // Adjust based on your requirements
    };

    try {
        const data = await sqs.receiveMessage(params).promise();

        if (data.Messages) {
            console.log('Received messages:');
            data.Messages.forEach((message) => {
                console.log('Message ID:', message.MessageId);
                console.log('Body:', message.Body);
                console.log('Attributes:', message.Attributes);
                console.log('Message Attributes:', message.MessageAttributes);
                console.log('-------------------');
            });

            // Delete received messages from the queue (optional)
            await deleteMessages(data.Messages.map((message) => message.ReceiptHandle));

            // Continue processing or handle the received messages as needed
        } else {
            console.log('No messages available in the queue.');
        }
    } catch (error) {
        console.error('Error receiving messages from the SQS queue:', error);
    }
}

// Function to delete messages from the SQS queue
async function deleteMessages(receiptHandles) {
    const deleteParams = {
        Entries: receiptHandles.map((handle, index) => ({
            Id: `msg${index + 1}`,
            ReceiptHandle: handle,
        })),
        QueueUrl: queueUrl,
    };

    try {
        await sqs.deleteMessageBatch(deleteParams).promise();
        console.log('Deleted messages from the queue.');
    } catch (error) {
        console.error('Error deleting messages from the SQS queue:', error);
    }
}

// Call the function to receive messages
receiveMessages();
