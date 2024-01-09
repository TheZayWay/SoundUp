import boto3
from botocore.exceptions import NoCredentialsError

def upload_to_s3(file, bucket_name):
    try:
        # Create an S3 client
        s3 = boto3.client('s3', aws_access_key_id='AKIA6GBMCDBRPTLU5FGW', aws_secret_access_key='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')

        # Upload the file to the specified bucket
        s3.upload_fileobj(file, bucket_name, file.filename)

        # Generate the URL of the uploaded file
        file_url = f'https://{bucket_name}.s3.amazonaws.com/{file.filename}'
        
        return file_url

    except NoCredentialsError:
        print("AWS credentials not available.")
        return None
    
def delete_file_from_s3(bucket_name, key):
    try:
        # Create an S3 client
        s3 = boto3.client('s3', aws_access_key_id='AKIA6GBMCDBRPTLU5FGW', aws_secret_access_key='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')

        # Delete the file from the specified bucket
        s3.delete_object(Bucket=bucket_name, Key=key)

        print(f"File {key} deleted successfully from S3 bucket {bucket_name}")
        return True

    except Exception as e:
        print(f"Error deleting file from S3: {e}")
        return False