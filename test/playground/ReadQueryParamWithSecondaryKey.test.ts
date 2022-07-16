import { APIGatewayProxyEvent } from "aws-lambda";

import { handler } from "../../services/SpacesTable/Read";

const event: APIGatewayProxyEvent = {
  queryStringParameters: {
    location: "London",
  },
} as any;

const result = handler(event, {} as any).then((apiResponse) => {
  const items = JSON.parse(apiResponse.body);
  console.log(123);
});
