import { APIGatewayProxyEvent } from "aws-lambda";

import { handler } from "../../services/SpacesTable/Create";

const event: APIGatewayProxyEvent = {
  body: {
    name: "someName",
    location: "some location",
  },
} as any;

const result = handler(event, {} as any).then((apiResponse) => {
  const items = JSON.parse(apiResponse.body);
  console.log(123);
});
