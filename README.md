A simple project showcasing managing Infrastructure as a Code (IaaS) for AWS. Best practice when deploying lambda would be using VPC setup.

However, for demo and AWS free tier purpose, all the lambdas are deployed without VPC in this project.

On top of that, screenshot attached below showing the Network Diagram within AWS with the Infrastructure.

![image](https://github.com/user-attachments/assets/b30103a4-8311-4f9b-8d4c-fd00f7a664dc)

**APIs**

Users APIs
- API Function Handler Path: src/services/users
- Mainly showcasing from validating of data coming into the lambda to interacting with DynamoDB
- Also showing how each APIs are structured properly under service folder with a clean architecture approach to separate business use-case from the controller itself
- Errors are caught properly to handle error message and logging properly accordingly
  
![image](https://github.com/user-attachments/assets/43f17fdf-e624-4e79-bea4-d5503c144a2b)

Posts API
- API Function Handler Path: src/services/posts
- Mainly showcasing how to interact with external API
- Also showing how to setup properly for api client such as axios with a proper logging from request, response to error
  
![image](https://github.com/user-attachments/assets/0875d078-3db0-4414-b0f5-7850ab4fa039)

Orders API
- API Function Handler Path: src/services/orders
- SNS Function Handler Path: src/services/sns
- SQS Function Handler Path: src/services/sqs
- Mainly showcasing decoupling certain operations and assign to message services such as SNS and SQS
- For this API, I am showcasing using API to publish a message to a SNS topic and fanout pattern to SQS queue

![image](https://github.com/user-attachments/assets/1d265226-aad5-4ad9-992a-c91cf2b6064f)
