import type { Construct } from 'constructs'
import * as cdk from 'aws-cdk-lib'
import { P6CDKNamer } from '../src'

class VisualizeStack extends cdk.Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id)

    new P6CDKNamer(this, 'MyP6CDKNamer', {
      accountAlias: 'theAlias',
    })
  }
}

const app = new cdk.App()
new VisualizeStack(app, 'VisualizeStack')
app.synth()
