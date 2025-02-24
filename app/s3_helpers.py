import boto3
import botocore
import os

# BUCKET_NAME = os.environ.get("S3_BUCKET")
BUCKET_NAME = 'soundup'
# S3_LOCATION = f"https://{BUCKET_NAME}.s3.amazonaws.com/"
S3_LOCATION = f"https://soundup.s3.amazonaws.com/"

s3 = boto3.client(
    "s3",
    aws_access_key_id=os.environ.get("S3_KEY"),
    aws_secret_access_key=os.environ.get("S3_SECRET")
)

def upload_to_s3(file, acl="public-read"):
  try:
    s3.upload_fileobj(file, BUCKET_NAME, file.filename, ExtraArgs={"ACL": acl, "ContentType": file.content_type})
  except Exception as e:
     return {"errors": str(e)}
  
def delete_file_from_s3(bucket_name, key):
    try:
        # Create an S3 client
        s3 = boto3.client('s3', aws_access_key_id=os.environ.get("S3_KEY"), aws_secret_access_key=os.environ.get("S3_SECRET"))

        # Delete the file from the specified bucket
        s3.delete_object(Bucket=bucket_name, Key=key)

        print(f"File {key} deleted successfully from S3 bucket {bucket_name}")
        return True

    except Exception as e:
        print(f"Error deleting file from S3: {e}")
        return False