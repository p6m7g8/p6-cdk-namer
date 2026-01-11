import * as cdk from 'aws-cdk-lib'
import { Template } from 'aws-cdk-lib/assertions'

import { P6CDKNamer } from '../src'

it('p6CDKNamer components', () => {
  // GIVEN
  const app = new cdk.App()
  const stack = new cdk.Stack(app, 'MyStack')

  // WHEN
  new P6CDKNamer(stack, 'p6namer', {
    accountAlias: 'theAlias',
  })

  // THEN
  const template = Template.fromStack(stack)
  template.hasResourceProperties('AWS::Lambda::Function', {
    Handler: 'index.handler',
    Runtime: 'nodejs24.x',
  })
  template.resourceCountIs('AWS::Lambda::Function', 2) // Custom Resource Handler counts too
})
