import { APIGatewayProxyEvent } from "aws-lambda";

import { handler } from "../../services/SpacesTable/Update";

const event: APIGatewayProxyEvent = {
  queryStringParameters: {
    spaceId: "49d7bbbf-70d6-47e1-baab-b943ef7a5ed9",
  },
  body: {
    location: "new location",
  },
} as any;

const result = handler(event, {} as any).then((apiResponse) => {
  const items = JSON.parse(apiResponse.body);
  console.log(123);
});
