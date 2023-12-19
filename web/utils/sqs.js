import AWS from 'aws-sdk'
import { AWS_ACCESS_KEY, AWS_SECRET_KEY, REGION, SQS_QUEUE } from process.env

// Configure AWS SDK with your credentials and region
AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: REGION,
});

const sqs = new AWS.SQS();

async function receiveMessages() {
  try {
    const params = {
      AttributeNames: ['All'],
      MaxNumberOfMessages: 10,
      MessageAttributeNames: ['All'],
      QueueUrl: SQS_QUEUE,
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

async function deleteMessages(receiptHandles) {
  try {
    const deleteParams = {
      Entries: receiptHandles.map((handle, index) => ({
        Id: `msg${index + 1}`,
        ReceiptHandle: handle,
      })),
      QueueUrl: SQS_QUEUE,
    };

    await sqs.deleteMessageBatch(deleteParams).promise();
    console.log('Deleted messages from the queue.');
  } catch (error) {
    console.error('Error deleting messages from the SQS queue:', error);
  }
}




async function sendMessage(messageBody) {
  try {
    const params = {
      MessageBody: JSON.stringify(messageBody),
      QueueUrl: SQS_QUEUE,
      DelaySeconds: 0,
    };

    await sqs.sendMessage(params).promise();
  } catch (error) {
    console.error('Error sending message to the SQS queue:', error);
  }
}