import multiparty from 'multiparty'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs, { access } from 'fs' // for reading of files
import mime from 'mime-types' // for check a file mime types (i.e ext)
import { isAdminRequest } from "./auth/[...nextauth]"
import { createConnections } from '@/lib/mongoose';

/** aws bucket name */
const bucketName = 'festus-nextjs-ecommerce'
export default async function handler(req, res) {
    await createConnections();
    await isAdminRequest(req, res) // validate if the user is admin
    const form = new multiparty.Form();
    const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });

    /** uploading the files
    * to a persistent storage
    * with aws
    */

    const client = new S3Client({
        region: 'us-east-1', // replace with your bucket's region
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,//replace it here
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY //and this one too!
        }
    })

    const links = []
    for (const file of files.file) {
        const ext = file.originalFilename.split('.').pop()

        /** generate a unique new file name and append the 
         * given extension from the originalFileName
         * property...
         */
        const newFileName = `${Date.now()}.${ext}`


        await client.send(new PutObjectCommand({
            Bucket: bucketName,//your own s3 bucket name
            Key: newFileName,
            Body: fs.readFileSync(file.path),
            ACL: 'public-read',
            ContentType: mime.lookup(file.path)
        }))
        /** getting the links */
        const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`
        links.push(link)

    }

    res.json({ links })

}


/** a custom config to enable us parse 
 * the json file ourselves
 */
export const config = {
    api: { bodyParser: false },
};