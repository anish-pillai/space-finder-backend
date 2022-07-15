import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path';

import { GenericTable } from './GenericTable';

export class SpaceStack extends Stack{

    private api = new RestApi(this,'SpaceApi');
    private spacesTable = new GenericTable(
        'SpacesTable',
        'spaceId',
        this
    )

    constructor(scope: Construct, id:string,  props: StackProps){
        super(scope,id,props);

        const helloLambdaWebpack = new LambdaFunction(this,'helloLambdaWebpack',{
            runtime: Runtime.NODEJS_16_X,
            code: Code.fromAsset(join(__dirname,'..','build', 'nodeHelloLambda')),
            handler: 'nodeHelloLambda.handler',
        });

        const helloLambda = new LambdaFunction(this,'helloLambda',{
            runtime: Runtime.NODEJS_16_X,
            code: Code.fromAsset(join(__dirname,'..','services', 'hello')),
            handler: 'hello.main',
        });

        const helloLambdaNodeJS = new NodejsFunction(this,'helloLambdaNodeJS',{
            entry: join(__dirname,'..','services', 'node-lambda', 'hello.ts'),
            handler: 'handler'
        })

        //Hello API Lambda Integration
        const helloLambdaIntegration = new LambdaIntegration(helloLambda);
        const helloLambdaResource = this.api.root.addResource('hello');
        helloLambdaResource.addMethod('GET', helloLambdaIntegration);
    }
}