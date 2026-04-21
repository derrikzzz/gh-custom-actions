import os
import mimetypes
import boto3
from botocore.config import Config

def deploy_s3_docker():
    bucket = os.environ.get('INPUT_BUCKET') #these are automatically generated variables
    bucket_region = os.environ['INPUT_BUCKET-REGION']
    dist_folder = os.environ['INPUT_DIST-FOLDER']
    
    configuration = Config(region_name=bucket_region)
    s3_client = boto3.client('s3', config=configuration) #automatically looks for environment variables with AWS credentials to authenticate outgoing AWS requests
    
    
    for root, subdirs, files in os.walk(dist_folder):
        for file in files:
            mime_type, _ = mimetypes.guess_type(file)
            s3_key = os.path.relpath(os.path.join(root, file), dist_folder)
            s3_client.upload_file(
                os.path.join(root, file),
                bucket,
                s3_key,
                ExtraArgs={"ContentType": mime_type or "application/octet-stream"}
            )
            
    website_url = f'http://{bucket}.s3-website-{bucket_region}.amazonaws.com'
    with open(os.environ['GITHUB_OUTPUT'], 'a') as f:
        f.write(f'website-url={website_url}\n')
    # set output using the current GITHUB_OUTPUT env file (::set-output is deprecated)
    
if __name__ == '__main__':
    deploy_s3_docker()
