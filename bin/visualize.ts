import type { Construct } from 'constructs'
import * as cdk from 'aws-cdk-lib'
import { P6Namer } from '../src/index'

class VisualizeStack extends cdk.Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id)

    new P6Namer(this, 'MyP6Namer', {
      accountAlias: 'theAlias',
    })
  }
}

const app = new cdk.App()
new VisualizeStack(app, 'VisualizeStack')
app.synth()
