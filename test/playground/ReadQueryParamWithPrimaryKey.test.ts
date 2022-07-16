import { APIGatewayProxyEvent } from "aws-lambda";

import { handler } from "../../services/SpacesTable/Read";

const event: APIGatewayProxyEvent = {
  queryStringParameters: {
    spaceId: "87ea19a9-b439-43c3-b110-6661d4566248",
  },
} as any;

const result = handler(event, {} as any).then((apiResponse) => {
  const items = JSON.parse(apiResponse.body);
  console.log(123);
});
