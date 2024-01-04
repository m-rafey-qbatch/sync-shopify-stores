import AWS from 'aws-sdk'
import { AWS_CONFIG } from "./constants.js"

// Configure AWS SDK with your credentials and region
AWS.config.update({
  accessKeyId: AWS_CONFIG.ACCESS_KEY,
  secretAccessKey: AWS_CONFIG.SECRET_KEY,
  region: AWS_CONFIG.REGION,
});

const sqs = new AWS.SQS();

export const receiveMessages = async () => {
  try {
    const params = {
      AttributeNames: ['All'],
      MaxNumberOfMessages: 10,
      MessageAttributeNames: ['All'],
      QueueUrl: AWS_CONFIG.SQS_QUEUE,
      VisibilityTimeout: 60,
      WaitTimeSeconds: 0,
    };

    const data = await sqs.receiveMessage(params).promise();

    if (data.Messages) {
      console.log('Received messages:');
      data.Messages.forEach((message) => {
        console.log('Message ID:', message.MessageId);

      });
      return data
    } else {
      console.log('No messages available in the queue.');
    }
  } catch (error) {
    console.error('Error receiving messages from the SQS queue:', error);
  }
}

export const deleteMessages = async (receiptHandles) => {
  try {
    const deleteParams = {
      Entries: receiptHandles.map((handle, index) => ({
        Id: `msg${index + 1}`,
        ReceiptHandle: handle,
      })),
      QueueUrl: AWS_CONFIG.SQS_QUEUE,
    };

    await sqs.deleteMessageBatch(deleteParams).promise();
    console.log('Deleted messages from the queue.');
  } catch (error) {
    console.error('Error deleting messages from the SQS queue:', error);
  }
}

export const sendMessage = async (messageBody, messageGroupId, messageDeduplicationId) => {
  try {
    const params = {
      MessageGroupId: messageGroupId,
      MessageBody: JSON.stringify(messageBody),
      MessageDeduplicationId: messageDeduplicationId,
      QueueUrl: AWS_CONFIG.SQS_QUEUE,
      DelaySeconds: 0,
    };

    await sqs.sendMessage(params).promise();
  } catch (error) {
    console.error('Error sending message to the SQS queue:', error);
  }
}