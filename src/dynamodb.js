import AWS from 'aws-sdk';
import './aws-config';

const docClient = new AWS.DynamoDB.DocumentClient();

export function putTodoItem(item) {
  const params = {
    TableName: 'to-do-list-db',
    Item: item
  };

  return new Promise((resolve, reject) => {
    docClient.put(params, (err, data) => {
      if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        reject(err);
      } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
        resolve(data);
      }
    });
  });
}

export function getTodoItems() {
    console.log(`here`);
  const params = {
    TableName: 'to-do-list-db',
  };

  return new Promise((resolve, reject) => {
    docClient.scan(params, (err, data) => {
      if (err) {
        console.error("Unable to retrieve. Error:", JSON.stringify(err, null, 2));
        reject(err);
      } else {
        console.log("Retrieved items:", JSON.stringify(data.Items, null, 2));
        resolve(data.Items); // return the todo items
      }
    });
  });
}



export async function putBaseData(baseData) {
  const itemsPerBatch = 25; // Number of items to include in each batch
  const batches = Math.ceil(baseData.length / itemsPerBatch); // Calculate the number of batches

  for (let i = 0; i < batches; i++) {
    const startIndex = i * itemsPerBatch;
    const endIndex = Math.min((i + 1) * itemsPerBatch, baseData.length);
    const batchItems = baseData.slice(startIndex, endIndex);

    const params = {
      RequestItems: {
        'to-do-list-db': batchItems.map(item => ({
          PutRequest: {
            Item: item
          }
        }))
      }
    };

    try {
      const data = await docClient.batchWrite(params).promise();
      console.log("Added items:", JSON.stringify(data, null, 2));
    } catch (err) {
      console.error("Unable to add items. Error JSON:", JSON.stringify(err, null, 2));
      throw err;
    }
  }
}

  

  export function getAllItems() {
    const params = {
      TableName: 'to-do-list-db'
    };
  
    return new Promise((resolve, reject) => {
      docClient.scan(params, (err, data) => {
        if (err) {
          console.error("Unable to scan items. Error JSON:", JSON.stringify(err, null, 2));
          reject(err);
        } else {
          const items = data.Items;
          // console.log("Items retrieved:", JSON.stringify(items, null, 2));
          resolve(items);
        }
      });
    });
  }


  export function updateElement(element) {
    const params = {
      TableName: 'to-do-list-db',
      Key: {
        id: element.id
      },
      UpdateExpression: 'SET priority = :priority',
      ExpressionAttributeValues: {
        ':priority': element.priority
      }
    };
  
    return new Promise((resolve, reject) => {
      docClient.update(params, (err, data) => {
        if (err) {
          console.error('Failed to update element in DynamoDB:', err);
          reject(err);
        } else {
          console.log('Element updated in DynamoDB:', data);
          resolve(data);
        }
      });
    });
  }
  
  