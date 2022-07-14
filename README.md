# space-finder-backend

Node initialization:
npm init -y
npm i -D aws-cdk aws-cdk-lib constructs ts-node typescript

# CDK Commands

cdk init app --language typescript
cdk synth
cdk bootstrap
cdk deploy <-- Deploys stack, if only thre's one stack
cdk deploy --all <-- Deploys all the stacks
cdk deploy FirstCdkStack <--Deploys FirstCdkStack alone
cdk list <-- Lists all the stacks available
cdk diff <-- Compares the stacks & shows differences locally
cdk destroy FirstCdkStack2 <-- Deletes FirstCdkStack2 stack
cdk doctor <-- Identifies errors in cdk or stacks
cdk deploy --parameters duration=9 <-- duration is parameter defined in the CfnParameter

API Reference Doc: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-construct-library.html
