# Deploy static website to AWS ECS

## Introduction

AWS Elastic Container Service (ECS) is a container orchestration service that helps deploy, manage, and scale containerized applications. This service comes along with AWS Elastic Container Registry (ECR), which is AWS's *Docker Hub*.

## Guide

### Push Docker images to ECR

When using ECR, you can push your images to one of the following (both if you want to):
- Public registry
    - Anyone can search for your images and pull them.
- Private registry
    - Not public, only accounts having access to the registry can read (pull) them. To be able to push images to private registry, the account needs write access(es).
    - The URL to the *default private registry* is `https://{{AWS_ACCOUNT_ID}}.dkr.ecr.{{AWS_REGION}}.amazonaws.com`

In a registry (either public or private), images belong to repositories (very similar to Docker Hub). An image is specified by its repository URI and its tag.

Before pushing your images to ECR, you must create a repository first. This can be done via the Console or AWS CLI. However, you can only push your images to a repository via the command line. The push commands are provided by the Console. The push commands would look like the following (in this example, I use variables)

```bash
# Shell Script
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin "$REPOSITORY_URL"
docker build . -t $REPOSITORY_URL
docker tag "$REPOSITORY_URL" "$REPOSITORY_URL:$IMAGE_TAG"
docker push "$REPOSITORY_URL:$IMAGE_TAG"
```

### Things to know before using ECS (with Fargate launch type)

ECS is a regional service, not a global service. By default, it uses VPC, Auto Scaling Group, and Load Balancer of the region it is in.

Containers in ECS can be launched with Fargate (serverless) or EC2. In my case, I choose Fargate because all I need to deploy is a static website.

To use ECS properly, you should know the following components (see AWS documentation for more details):
- Clusters
  - A logical grouping of tasks or services.
  - A cluster can contain multiple services and tasks.
  - A cluster can contain multiple instances.
- Container and Images
- Task definitions
  - A task definition is a blueprint for your application.
  - It is a JSON file.
  - It contains information about one or more containers, their definitions, and their configurations.
  - It is used to run tasks or services.
- Tasks
  - A task is a running container.
  - A task is created from a task definition.
  - A task can be run on one or more instances.
- Services
  - A service is a long-running task.
  - A service is created from a task definition.
  - A service is run on one or more instances.
  - A service can be scaled up or down.
  - A service can be load balanced.
- Container agents
  - A container agent is a program running on an instance.
  - It is used to register the instance to a cluster.
  - It is used to run tasks on the instance.
  - It is used to report the status of the instance to ECS.

### Create a cluster, task definition, and service

- Create a cluster
  - Go to the Console, select your desired region, and go to ECS.
  - Choose **Clusters** and then **Create cluster**.
  - Enter your configuration.
- Create a task definition
  - In ECS page of the Console, select **Task Definitions**.
  - Select **Create new task definition**, there would be two options: create with JSON or with form.
  - Provide the following:
    - Task definition name.
    - Container name and Image URI (not Repository URI).
    - Port mappings.
    - Environment variables (if any, you can add key-value pairs or load from file).
    - Health check and Docker configurations (if any).
    - Select application environment (Fargate or EC2).
    - Select OS/Architecture.
    - Enter CPU/Memory for task and each container (the latter is optional).
    - Select task role and network mode.
    - Monitoring, Logging options.
- Create a service
  - Select the cluster.
  - Within the **Services** tab, and click **Create**.
  - Under **Deployment configuration**, specify:
    - Task definition.
    - Service name.
    - Desired tasks (a positive integer, for example, 1).
  - In **Networking**, select the VPC, subnets, and security group such that your website can be accessed after deployed. In my case, the default security group, which allow all traffic doesn't work. Therefore, I have to create a new security group that allows HTTP traffic.

