# Deploy static website to AWS S3

## Introduction

AWS S3 (AWS Simple Storage Service) provides Storage-as-a-Service. This service also allows hosting static website.

To use S3 at basic level, one would create *bucket* and upload files, folders to it.

Also, in this repository, I have created a Github workflow where one of its job is deploying to AWS S3.

## Guide

1. Prepare an AWS account.
2. Create/choose an S3 bucket.
3. Upload to the selected bucket.
4. Enable hosting static website.
5. Automate (optional).
6. CloudFront (optional, but recommended).
7. Route 53 (optional).

### Prepare an AWS account

To use AWS, you will either log in with *root account* or *IAM account*.

- If you use root account, you can access any services, of course including S3.
- Otherwise, with an IAM account (user), you need to be granted some permissions to work with S3. So, contact people who has access to root account, or add the permissions if you can access the root account (do everything via root account is not recommended).

There are two ways to achieve this (add the permissions):
  - Via IAM console, create an user group and attach permissions policies that you need. In our case, that policy would be `AmazonS3FullAccess` (of course, this is wayyy too broad and not recommended). Then add your IAM account (user) to the newly created user group.
  - Add S3 bucket policy that allow your IAM account to read/write/delete files (objects) of the bucket. See the next section for more details.

### Create/choose an S3 bucket

- Firstly, you need an S3 bucket to store your static website content.
- Grant permissions to your IAM account by editing *Bucket policy*. The policy is in JSON format. The desired content would look like this:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": [
          "arn:aws:iam::{{your account id}}:user/{{your username}}"
        ]
      },
      "Action": [
        "s3:ListBucket",
        "s3:PutObject",
        "s3:GetObject",
        "s3:GetObjectVersion",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::{{bucket name}}",
        "arn:aws:s3:::{{bucket name}}/*"
      ]
    }
  ]
}
```

### Upload to the selected bucket

After setting up, you (your IAM account) will be able to upload files and folders to the bucket that you have access to.

You can upload them via the AWS Console.

### Enable hosting static website

Before enabling hosting static website, you have to make the bucket *public*. Go to **Permissions** tab, disable every Block Public Access setting in **Block public access (bucket settings)**. Furthermore, you need an additional statement to the bucket policy:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": [
          "arn:aws:iam::{{your account id}}:user/{{your username}}"
        ]
      },
      "Action": [
        "s3:ListBucket",
        "s3:PutObject",
        "s3:GetObject",
        "s3:GetObjectVersion",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::{{bucket name}}",
        "arn:aws:s3:::{{bucket name}}/*"
      ]
    },
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": [
        "s3:GetObject",
        "s3:GetObjectVersion"
      ],
      "Resource": [
        "arn:aws:s3:::{{bucket name}}",
        "arn:aws:s3:::{{bucket name}}/*"
      ]
    }
  ]
}
```

In AWS Console, go to your bucket page and select **Properties** tab. Scroll to **Static website hosting** and click **Edit**. You will be navigated to a form. In this form:

- Enable static website hosting.
- Choose hosting type (Host a static website).
- There is a text input that requires **Index document**, you need to fill in the path to your `index.html`. For examples, in the bucket, your `index.html` locates at `{{bucket name}}/prefix/to/index.html`, then you need to type `prefix/to/index.html` to the input.
- Another text input is **Error document**. This is optional in general, but it is a must for the React application since we use `react-router-dom`. So, you need to fill in this input as the same as **Index document**.
- Click **Save changes**.
- Back to the **Properties** tab. Now the **Static website hosting** has Bucket website endpoint - Browse this URL, then you will see the React application. The URL has format `http://{{bucket name}}.s3-website-{{region}}.amazonaws.com`

### Automate (optional)

Now you might want to apply Continuous Delivery - automatically update S3 objects (files) of your React application as you make changes to source code.

The uploading part can be done via AWS CLI.

- Install AWS CLI (version 2).
- Get your *access key id* and *secret access key* (get them from IAM console, or ask someone who has access to the root account to give them to you)
- In your Linux machine (the machine that will be used to deploy the React application), create `~/.aws/credentials` file with the following content
```toml
[default]
aws_access_key_id={{your access key id}}
aws_secret_access_key={{you secret access key}}
```
- Then you can upload the `./build` directory to the bucket via the command
```shell
aws s3 sync ./path/to/build s3://{{bucket name}}
```
You might wanna add `--delete` flag to remove the files that don't exist in `./path/to/build`.

### CloudFront (optional, but recommended)

Using *Index Document* and *Error Document* would work, but it is just a work-around.

The recommended solution is using **AWS CloudFront Function**. See pros and cons of this approach and others [here](https://stackoverflow.com/a/72450228).

### Route 53 (optional)

Let's say, you want to "assign" a domain to your S3-hosted static website. Here is a checklist to do that:

- To follow this approach, the name of your S3 bucket must be identical to your domain (for example, `duong755.com`, `s3.duong755.com`).
- Register a domain. You can do this via Route 53 or any other domain provider.
- Create a **hosted zone** with Route 53. Name of this hosted zone is identical to your domain name (for example, `duong755.com`). If you registed domain via other domain provider, you have to provide custom nameservers to it. In the hosted zone, there is an NS record of which value contains 4 nameservers - add ALL of them to list of custom nameservers.
- In the hosted zone, create an alias record, which maps to your S3 bucket. See [this Amazone S3 User Guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/website-hosting-custom-domain-walkthrough.html).
