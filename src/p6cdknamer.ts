import type { Construct } from 'constructs'
import * as cdk from 'aws-cdk-lib'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as lambdajs from 'aws-cdk-lib/aws-lambda-nodejs'
import * as cr from 'aws-cdk-lib/custom-resources'
import * as floyd from 'cdk-iam-floyd'

export interface IP6CDKNamerProps {
  accountAlias: string
}

export class P6CDKNamer extends cdk.Resource {
  constructor(scope: Construct, id: string, props: IP6CDKNamerProps) {
    super(scope, id)

    const policy = new floyd.Statement.Iam().allow().toCreateAccountAlias()

    const onEvent = new lambdajs.NodejsFunction(this, 'p6cdknamer', {
      runtime: lambda.Runtime.NODEJS_22_X,
      timeout: cdk.Duration.seconds(2),
      tracing: lambda.Tracing.ACTIVE,
      bundling: {
        minify: true,
      },
    })

    onEvent.addToRolePolicy(policy)

    const provider = new cr.Provider(this, 'P6CDKNamer/Provider', {
      onEventHandler: onEvent,
    })

    new cdk.CustomResource(this, 'P6CDKNamer/CR', {
      serviceToken: provider.serviceToken,
      properties: {
        AccountAlias: props.accountAlias,
      },
    })
  }
}
