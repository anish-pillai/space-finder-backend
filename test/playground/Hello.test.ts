////

//THIS IS FOR QUERY ALL//
import { handler } from "../../services/SpacesTable/Read";

const event = {
  body: {
    location: "Paris",
  },
};

const result = handler({} as any, {} as any).then((apiResponse) => {
  const items = JSON.parse(apiResponse.body);
  console.log(123);
});
