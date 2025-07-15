import os
import boto3
from botocore.config import Config

def deploy_s3_docker():
    bucket = os.environ.get['INPUT_BUCKET'] #these are automatically generated variables
    bucket_region = os.environ['INPUT_BUCKET_REGION']
    dist_folder = os.environ['INPUT_DIST_FOLDER']
    
    configuration = Config(region_name=bucket_region)
    s3_client = boto3.client('s3', config=configuration) #automatically looks for environment variables with AWS credentials to authenticate outgoing AWS requests
    
    
    for root, subdirs, files in os.walk(dist_folder):
        for file in files:
            s3_client.upload_file(os.path.join(root, file), bucket, file)
            
    website_url = f'https://{bucket}.s3-website-{bucket_region}.amazonaws.com'
    print(f'::set-output name=website_url::{website_url}')
    # set output command to set website url output of action to this dynamic value
    
if __name__ == '__main__':
    deploy_s3_docker()