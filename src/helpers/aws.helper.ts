import {
  GetObjectCommand,
  HeadBucketCommand,
  PutObjectAclCommand,
  PutObjectCommand,
  S3Client
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const BucketName = 'sentircreativo'

const client = new S3Client({
  region: 'us-east-2',
  credentials: {
    accessKeyId: 'AKIASNXHCMIV7AGSTLWQ',
    secretAccessKey: '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'
  }
})

interface UploadFileParams {
  name: string
  file: File
  parentId: string
  parent: string
  publicFile?: boolean
}

export const conexionAws = async (): Promise<void> => {
  const command = new HeadBucketCommand({ Bucket: BucketName })

  try {
    await client.send(command)
    console.log('Conexión exitosa a AWS S3')
  } catch (error) {
    console.error('Error al verificar la conexión:', error)
  }
}

export async function uploadFileToS3({
  name,
  file,
  parentId,
  parent,
  publicFile
}: UploadFileParams): Promise<any> {
  if (!file) throw new Error('Please choose a file to upload first.')
  const [ext] = file.name.split('.').reverse()
  const fileKey = `${parent}/${parentId}/${name}.${ext}`
  const fileData = await file.arrayBuffer()
  console.log(parent)
  const command = new PutObjectCommand({
    Bucket: BucketName,
    Key: fileKey,
    Body: fileData,
    ContentType: file.type,
    ...(publicFile ? { ACL: 'public-read' } : { ACL: 'private' })
  })

  try {
    const response = await client.send(command)
    console.log('Successfully uploaded!', response)
    const fileUrl = `https://${BucketName}.s3.us-east-2.amazonaws.com/${fileKey}`
    console.log('Successfully uploaded! File URL:', fileUrl)
    return fileUrl
  } catch (error) {
    console.error('Error al subir el archivo', error)
    throw error
  }
}

export async function updateFileACL(
  url: string,
  publicFile: boolean
): Promise<string> {
  const fileName = getFileNameFromUrl(url)
  if (!fileName) return ''

  const command = new PutObjectAclCommand({
    Bucket: BucketName,
    Key: fileName,
    ACL: publicFile ? 'public-read' : 'private'
  })

  try {
    await client.send(command)
    console.log('Successfully updated file ACL')
    return 'File ACL updated successfully'
  } catch (error) {
    console.error('Error updating file ACL:', error)
    throw error
  }
}

const getFileNameFromUrl = (url: string): string => {
  if (!url) return ''
  const fileName = decodeURIComponent(url)
    .split('/')
    .filter((x) => x)
    .slice(2)
    .join('/')
  return fileName
}

export async function getFileFromS3(
  url: string,
  expiry?: number
): Promise<string> {
  const fileName = getFileNameFromUrl(url)
  if (!fileName) return ''

  const params = {
    Bucket: BucketName,
    Key: fileName,
    ...(expiry && { Expires: expiry })
  }

  try {
    const command = new GetObjectCommand(params)
    const response = await client.send(command)
    const url = URL.createObjectURL(response.Body)
    return url
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function signS3Url(url: string): Promise<string> {
  try {
    const command = new GetObjectCommand({
      Bucket: 'sentircreativo',
      Key: getFileNameFromUrl(url)
    })
    const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 })

    console.log(signedUrl)
    return signedUrl
  } catch (error) {
    console.error('Error al firmar la URL:', error)
    throw error
  }
}
