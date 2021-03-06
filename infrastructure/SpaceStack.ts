import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import {
  Code,
  Function as LambdaFunction,
  Runtime,
} from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

import { GenericTable } from "./GenericTable";

export class SpaceStack extends Stack {
  private api = new RestApi(this, "SpaceApi");
  // private spacesTable = new GenericTable(
  //     'SpacesTable',
  //     'spaceId',
  //     this
  // )

  private spacesTable = new GenericTable(this, {
    tableName: "SpacesTable",
    primaryKey: "spaceId",
    createLambdaPath: "Create",
    readLambdaPath: "Read",
    updateLambdaPath: "Update",
    deleteLambdaPath: "Delete",
    secondaryIndexes: ["location"],
  });

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const helloLambdaNodeJS = new NodejsFunction(this, "helloLambdaNodeJS", {
      entry: join(__dirname, "..", "services", "node-lambda", "hello.ts"),
      handler: "handler",
    });

    const s3ListPolicy = new PolicyStatement();
    s3ListPolicy.addActions("s3:ListAllMyBuckets");
    s3ListPolicy.addResources("*");
    helloLambdaNodeJS.addToRolePolicy(s3ListPolicy);

    //Hello API Lambda Integration
    const helloLambdaIntegration = new LambdaIntegration(helloLambdaNodeJS);
    const helloLambdaResource = this.api.root.addResource("hello");
    helloLambdaResource.addMethod("GET", helloLambdaIntegration);

    //Spaces API Integrations:
    const spacesResource = this.api.root.addResource("spaces");
    spacesResource.addMethod("POST", this.spacesTable.createLambdaIntegration);
    spacesResource.addMethod("GET", this.spacesTable.readLambdaIntegration);
    spacesResource.addMethod("PUT", this.spacesTable.updateLambdaIntegration);
    spacesResource.addMethod(
      "DELETE",
      this.spacesTable.deleteLambdaIntegration
    );
  }
}
