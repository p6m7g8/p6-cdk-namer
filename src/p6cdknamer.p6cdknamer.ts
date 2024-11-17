import type { CloudFormationCustomResourceEvent, CloudFormationCustomResourceResponse } from 'aws-lambda'
import { CreateAccountAliasCommand, IAMClient } from '@aws-sdk/client-iam'
import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
})

const iamClient = new IAMClient({})

/**
 * Creates an account alias for the AWS account.
 *
 * @param alias - The alias to create.
 */
async function createAccountAlias(alias: string): Promise<void> {
  const command = new CreateAccountAliasCommand({ AccountAlias: alias })

  try {
    const response = await iamClient.send(command)
    logger.info(`Successfully created account alias: ${alias}`, { response })
  }
  catch (error) {
    logger.error(`Failed to create account alias: ${(error as Error).message}`)
    throw error
  }
}

/**
 * AWS Lambda handler to create an account alias.
 *
 * @param event - The Lambda event.
 * @returns A promise that resolves when the account alias is created.
 */
export async function handler(event: CloudFormationCustomResourceEvent): Promise<CloudFormationCustomResourceResponse> {
  logger.info(`Received event: ${JSON.stringify(event)}`)

  const { ResourceProperties } = event
  const alias = ResourceProperties?.AccountAlias

  try {
    await createAccountAlias(alias)
    logger.info(`Account alias creation succeeded for alias: ${alias}`)
  }
  catch (error) {
    logger.error(`Account alias creation failed: ${(error as Error).message}`)
    throw error
  }

  return {
    Status: 'SUCCESS',
    PhysicalResourceId: alias,
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
  }
}
