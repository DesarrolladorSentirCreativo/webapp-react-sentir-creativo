import AWS from 'aws-sdk'

const BucketName = 'sentircreativo'

AWS.config.update({
  region: 'us-east-2',
  accessKeyId: 'AKIASNXHCMIV7AGSTLWQ',
  secretAccessKey: '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'
})

const s3 = new AWS.S3()

interface UploadFileParams {
  name: string
  file: any
  parentId: string
  parent: string
  publicFile?: boolean
}

export const conexionAws = async (): Promise<void> => {
  s3.headBucket({ Bucket: 'sentircreativo' }, (error, data) => {
    if (error) {
      console.error('Error al verificar la conexión:', error)
    } else {
      console.log('Conexión exitosa a AWS S3')
    }
  })
}

export async function uploadFileToS3({
  name,
  file,
  parentId,
  parent,
  publicFile
}: UploadFileParams): Promise<any> {
  console.log('file', file)
  if (!file) throw new Error('Please choose a file to upload first.')
  const [ext] = file.name.split('.').reverse()
  const fileKey = `${parent}/${parentId}/${name}.${ext}`
  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: BucketName,
      Key: fileKey,
      Body: file,
      ...(publicFile ? { ACL: 'public-read' } : {})
    }
  })

  const data = await upload.promise()
  console.log('Successfully uploaded!', data)
  return data
}

export async function updateFileACL(
  url: string,
  publicFile: boolean
): Promise<string> {
  return await new Promise((resolve, reject) => {
    const fileName = getFileNameFromUrl(url)
    if (!fileName) {
      resolve('')
      return
    }
    const params: AWS.S3.PutObjectAclRequest = {
      Bucket: BucketName,
      Key: `${fileName}`,
      ACL: publicFile ? 'public-read' : 'private'
    }
    const putObjectAclPromise = new Promise((resolve, reject) => {
      s3.putObjectAcl(params, (error, url) => {
        if (error) {
          reject(error)
          return
        }
        resolve(url)
      })
    })

    putObjectAclPromise
      .then((url) => {
        // La URL se ha resuelto correctamente
        console.log(url)
      })
      .catch((error) => {
        // Ha ocurrido un error al obtener la URL
        console.error(error)
      })
  })
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
  return await new Promise((resolve, reject) => {
    const fileName = getFileNameFromUrl(url)
    if (!fileName) {
      resolve('')
      return
    }
    const params: AWS.S3.GetObjectRequest = {
      Bucket: BucketName,
      Key: `${fileName}`,
      ...(expiry && { Expires: expiry })
    }
    s3.getSignedUrl('getObject', params, (error, url) => {
      if (error) {
        reject(error)
        return
      }
      resolve(url)
    })
  })
}

export async function deleteFileFromS3(url: string): Promise<any> {
  return await new Promise((resolve, reject) => {
    const fileName = getFileNameFromUrl(url)
    s3.deleteObject(
      { Bucket: BucketName, Key: fileName },
      function (error, data) {
        console.log(error)
        if (error) {
          reject(error)
          return
        }
        resolve(data)
      }
    )
  })
}
