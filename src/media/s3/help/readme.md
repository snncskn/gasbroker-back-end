This is a simple guide to generate pre-signed GET and PUT URLs for AWS S3. This is a convenient way to directly upload images to an AWS S3 bucket without the need of sending the file to our server first. I really like this approach as it allows your application to scale nicely, increasing performance and avoiding double-transferring the data.

Under this approach, we will have a simple server with two endpoints:

- GET /generate-get-url, and
- GET /generate-put-url

The server will get a request from the client, generate pre-signed URLs based in our AWS S3 credentials, and send back a response with the corresponding pre-signed URL.
Using the pre-signed URLs on the client side is now just as simple as making normal GET or PUT requests with axios.

**Requirements**
AWS Account.
AWS S3 access key and secret key
npm
Project Dependencies
aws-sdk
express
dotenv
cors
create-react-app
axios

**Server-side (Node/Express)**
In order to keep the code modular I would like to split this section into two steps:
Creating an AWS Presigner module with the only job of generating AWS S3 pre-signed URLs with Node.
Creating a simple express server that will implement AWS Presigner module and expose the results in the corresponding endpoints.
AWS Credentials

_First of all, you should have a .env file that looks like this:_

S3_KEY=XXXXXXXXXXXXXXXXXXXX
S3_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
BUCKET_NAME=your-bucket-name
BUCKET_REGION=your-bucket-location(eg.us-east-1)

Note that specifying the right bucket region is as important as the access and secret keys.


### Implementing an AWS Presigner Module
The main objective of our AWS Presigner Module is to read your AWS credentials from the .env file, configure the aws-sdk package, and implement two methods:

- generateGetUrl(key)
- generatePutUrl(key, ContentType)

The key parameter refers to the name of the remote file that is going to be retrieved, or the name the file is going to be saved in the bucket. Note that both of these methods return a promise so we can use them asynchronously in our express server.
With AWSPresigner.js most of the hard work has been done. Now is as simple as serving the pre-signed URLs and using them in the client-side.