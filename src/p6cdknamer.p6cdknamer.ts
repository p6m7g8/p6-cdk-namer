import type { CloudFormationCustomResourceEvent, CloudFormationCustomResourceResponse } from 'aws-lambda'
import { CreateAccountAliasCommand, DeleteAccountAliasCommand, IAMClient } from '@aws-sdk/client-iam'
import winston from 'winston'

type Status = 'SUCCESS' | 'FAILED'

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
async function createAccountAlias(alias: string): Promise<Status> {
  const command = new CreateAccountAliasCommand({ AccountAlias: alias })

  try {
    const response = await iamClient.send(command)
    logger.info(`Successfully created account alias: ${alias}`, { response })
    return 'SUCCESS'
  }
  catch (error) {
    logger.error(`Failed to create account alias: ${(error as Error).message}`)
    return 'FAILED'
  }
}

/**
 * Deletes an account alias for the AWS account.
 *
 * @param alias - The alias to create.
 */
async function deleteAccountAlias(alias: string): Promise<Status> {
  const command = new DeleteAccountAliasCommand({ AccountAlias: alias })

  try {
    const response = await iamClient.send(command)
    logger.info(`Successfully deleted account alias: ${alias}`, { response })
    return 'SUCCESS'
  }
  catch (error) {
    logger.error(`Failed to delete account alias: ${(error as Error).message}`)
    return 'FAILED'
  }
}

/**
 * Updates an account alias for the AWS account.
 *
 * @param alias - The alias to create.
 */
async function updateAccountAlias(alias: string): Promise<Status> {
  const deleteStatus = await deleteAccountAlias(alias)
  if (deleteStatus !== 'SUCCESS') {
    return deleteStatus
  }
  const createStatus = await createAccountAlias(alias)
  return createStatus
}

/**
 * AWS Lambda handler to create an account alias.
 *
 * @param event - The Lambda event.
 * @returns A promise that resolves when the account alias is created.
 */
export async function handler(event: CloudFormationCustomResourceEvent): Promise<CloudFormationCustomResourceResponse> {
  logger.info(`Received event: ${JSON.stringify(event)}`)

  const { RequestType, ResourceProperties } = event
  const alias = ResourceProperties?.AccountAlias

  let status: Status
  if (RequestType === 'Delete') {
    status = await deleteAccountAlias(alias)
  }
  else if (RequestType === 'Update') {
    status = await updateAccountAlias(alias)
  }
  else {
    status = await createAccountAlias(alias)
  }

  return {
    Status: status,
    Reason: 'See the details in CloudWatch Log Stream',
    PhysicalResourceId: alias,
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
  }
}
